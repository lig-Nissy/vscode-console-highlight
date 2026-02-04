import * as vscode from 'vscode';

let decorationType: vscode.TextEditorDecorationType;

export function activate(context: vscode.ExtensionContext) {
  console.log('Console Log Highlight is now active!');

  // デコレーションタイプを作成
  updateDecorationStyle();

  // アクティブエディタが変更されたときにハイライトを更新
  vscode.window.onDidChangeActiveTextEditor(
    (editor) => {
      if (editor) {
        updateDecorations(editor);
      }
    },
    null,
    context.subscriptions
  );

  // ドキュメントが変更されたときにハイライトを更新
  vscode.workspace.onDidChangeTextDocument(
    (event) => {
      const editor = vscode.window.activeTextEditor;
      if (editor && event.document === editor.document) {
        updateDecorations(editor);
      }
    },
    null,
    context.subscriptions
  );

  // 設定が変更されたときにスタイルを更新
  vscode.workspace.onDidChangeConfiguration(
    (event) => {
      if (event.affectsConfiguration('consoleHighlight')) {
        updateDecorationStyle();
        const editor = vscode.window.activeTextEditor;
        if (editor) {
          updateDecorations(editor);
        }
      }
    },
    null,
    context.subscriptions
  );

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
  const backgroundColor = config.get<string>('backgroundColor', 'rgba(255, 255, 0, 0.3)');
  const borderColor = config.get<string>('borderColor', 'rgba(255, 200, 0, 0.8)');

  decorationType = vscode.window.createTextEditorDecorationType({
    backgroundColor: backgroundColor,
    borderRadius: '3px',
    border: `1px solid ${borderColor}`,
  });
}

function updateDecorations(editor: vscode.TextEditor) {
  const document = editor.document;
  const text = document.getText();

  // console.log, console.warn, console.error, console.info, console.debug を検索
  const consoleRegex = /console\.(log|warn|error|info|debug)\s*\([^)]*\)/g;

  const decorations: vscode.DecorationOptions[] = [];
  let match;

  while ((match = consoleRegex.exec(text)) !== null) {
    const startPos = document.positionAt(match.index);
    const endPos = document.positionAt(match.index + match[0].length);
    const range = new vscode.Range(startPos, endPos);

    decorations.push({ range });
  }

  editor.setDecorations(decorationType, decorations);
}

export function deactivate() {
  if (decorationType) {
    decorationType.dispose();
  }
}
