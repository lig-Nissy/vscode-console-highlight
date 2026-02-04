"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = require("vscode");
let decorationType;
// console文にマッチする正規表現（行全体を削除するため、行頭の空白と末尾のセミコロン・改行も含む）
const CONSOLE_REGEX = /console\.(log|warn|error|info|debug)\s*\([^)]*\)/g;
const CONSOLE_LINE_REGEX = /^[ \t]*console\.(log|warn|error|info|debug)\s*\([^)]*\);?[ \t]*\r?\n?/gm;
function activate(context) {
    // デコレーションタイプを作成
    updateDecorationStyle();
    // アクティブエディタが変更されたときにハイライトを更新
    vscode.window.onDidChangeActiveTextEditor((editor) => {
        if (editor) {
            updateDecorations(editor);
        }
    }, null, context.subscriptions);
    // ドキュメントが変更されたときにハイライトを更新
    vscode.workspace.onDidChangeTextDocument((event) => {
        const editor = vscode.window.activeTextEditor;
        if (editor && event.document === editor.document) {
            updateDecorations(editor);
        }
    }, null, context.subscriptions);
    // 設定が変更されたときにスタイルを更新
    vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration('consoleHighlight')) {
            updateDecorationStyle();
            const editor = vscode.window.activeTextEditor;
            if (editor) {
                updateDecorations(editor);
            }
        }
    }, null, context.subscriptions);
    // 現在のファイルからconsole文を一括削除するコマンド
    const removeAllCommand = vscode.commands.registerCommand('consoleHighlight.removeAll', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) {
            vscode.window.showWarningMessage('No active editor found.');
            return;
        }
        const document = editor.document;
        const text = document.getText();
        const matches = text.match(CONSOLE_LINE_REGEX);
        if (!matches || matches.length === 0) {
            vscode.window.showInformationMessage('No console statements found.');
            return;
        }
        const confirm = await vscode.window.showWarningMessage(`Found ${matches.length} console statement(s). Remove all?`, 'Yes', 'No');
        if (confirm !== 'Yes') {
            return;
        }
        const newText = text.replace(CONSOLE_LINE_REGEX, '');
        const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
        await editor.edit((editBuilder) => {
            editBuilder.replace(fullRange, newText);
        });
        vscode.window.showInformationMessage(`Removed ${matches.length} console statement(s).`);
    });
    // ワークスペース全体からconsole文を一括削除するコマンド
    const removeAllInWorkspaceCommand = vscode.commands.registerCommand('consoleHighlight.removeAllInWorkspace', async () => {
        const files = await vscode.workspace.findFiles('**/*.{js,ts,jsx,tsx}', '**/node_modules/**');
        if (files.length === 0) {
            vscode.window.showInformationMessage('No JavaScript/TypeScript files found.');
            return;
        }
        let totalRemoved = 0;
        let filesModified = 0;
        // 先にカウント
        for (const file of files) {
            const document = await vscode.workspace.openTextDocument(file);
            const text = document.getText();
            const matches = text.match(CONSOLE_LINE_REGEX);
            if (matches) {
                totalRemoved += matches.length;
            }
        }
        if (totalRemoved === 0) {
            vscode.window.showInformationMessage('No console statements found in workspace.');
            return;
        }
        const confirm = await vscode.window.showWarningMessage(`Found ${totalRemoved} console statement(s) in ${files.length} file(s). Remove all?`, 'Yes', 'No');
        if (confirm !== 'Yes') {
            return;
        }
        totalRemoved = 0;
        for (const file of files) {
            const document = await vscode.workspace.openTextDocument(file);
            const text = document.getText();
            const matches = text.match(CONSOLE_LINE_REGEX);
            if (matches && matches.length > 0) {
                const newText = text.replace(CONSOLE_LINE_REGEX, '');
                const edit = new vscode.WorkspaceEdit();
                const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
                edit.replace(document.uri, fullRange, newText);
                await vscode.workspace.applyEdit(edit);
                await document.save();
                totalRemoved += matches.length;
                filesModified++;
            }
        }
        vscode.window.showInformationMessage(`Removed ${totalRemoved} console statement(s) from ${filesModified} file(s).`);
    });
    context.subscriptions.push(removeAllCommand, removeAllInWorkspaceCommand);
    // 初期ハイライト
    if (vscode.window.activeTextEditor) {
        updateDecorations(vscode.window.activeTextEditor);
    }
}
function updateDecorationStyle() {
    // 既存のデコレーションを破棄
    if (decorationType) {
        decorationType.dispose();
    }
    const config = vscode.workspace.getConfiguration('consoleHighlight');
    const backgroundColor = config.get('backgroundColor', 'rgba(255, 255, 0, 0.3)');
    const borderColor = config.get('borderColor', 'rgba(255, 200, 0, 0.8)');
    decorationType = vscode.window.createTextEditorDecorationType({
        backgroundColor: backgroundColor,
        borderRadius: '3px',
        border: `1px solid ${borderColor}`,
    });
}
function updateDecorations(editor) {
    const document = editor.document;
    const text = document.getText();
    const decorations = [];
    let match;
    const regex = new RegExp(CONSOLE_REGEX.source, 'g');
    while ((match = regex.exec(text)) !== null) {
        const startPos = document.positionAt(match.index);
        const endPos = document.positionAt(match.index + match[0].length);
        const range = new vscode.Range(startPos, endPos);
        decorations.push({ range });
    }
    editor.setDecorations(decorationType, decorations);
}
function deactivate() {
    if (decorationType) {
        decorationType.dispose();
    }
}
//# sourceMappingURL=extension.js.map