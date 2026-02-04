# Console Log Highlight

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

JavaScript/TypeScriptファイル内の`console.log`などのconsole文をハイライト表示するVSCode拡張機能です。

## 機能

### ハイライト

以下のconsole文を自動でハイライトします：

- `console.log()`
- `console.warn()`
- `console.error()`
- `console.info()`
- `console.debug()`

### 一括削除

コマンドパレット（`Cmd+Shift+P` / `Ctrl+Shift+P`）から実行：

| コマンド | 説明 |
|---------|------|
| `Remove All Console Statements` | 現在のファイルから一括削除 |
| `Remove All Console Statements in Workspace` | ワークスペース全体から一括削除 |

## インストール

### VSIXから（ローカル）

1. [Releases](https://github.com/lig-Nissy/vscode-console-highlight/releases)から最新の`.vsix`ファイルをダウンロード
2. VSCodeを開く
3. `Cmd+Shift+P`（Windows: `Ctrl+Shift+P`）
4. 「Extensions: Install from VSIX...」を選択
5. ダウンロードした`.vsix`ファイルを選択

### ソースから

```bash
git clone https://github.com/lig-Nissy/vscode-console-highlight.git
cd vscode-console-highlight
npm install
npm run package
# 生成された .vsix ファイルをVSCodeでインストール
```

## 設定

VSCodeの設定から以下の項目をカスタマイズできます：

| 設定項目 | 説明 | デフォルト値 |
|---------|------|-------------|
| `consoleHighlight.backgroundColor` | ハイライトの背景色 | `rgba(255, 255, 0, 0.3)` |
| `consoleHighlight.borderColor` | ハイライトのボーダー色 | `rgba(255, 200, 0, 0.8)` |

### 設定例

```json
{
  "consoleHighlight.backgroundColor": "rgba(255, 100, 100, 0.3)",
  "consoleHighlight.borderColor": "rgba(255, 0, 0, 0.8)"
}
```

## 対応言語

- JavaScript (`.js`)
- TypeScript (`.ts`)
- JavaScript React (`.jsx`)
- TypeScript React (`.tsx`)

## 開発

```bash
# 依存関係のインストール
npm install

# コンパイル
npm run compile

# ウォッチモード
npm run watch

# パッケージ作成
npm run package
```

### デバッグ

1. VSCodeでプロジェクトを開く
2. `F5`を押してデバッグモードで起動
3. 新しいVSCodeウィンドウが開き、拡張機能がテストできる

## Contributing

貢献を歓迎します！

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチをプッシュ (`git push origin feature/amazing-feature`)
5. Pull Requestを作成

## License

MIT
