# Console Log Highlight

JavaScript/TypeScriptファイル内の`console.log`などのconsole文をハイライト表示するVSCode拡張機能です。

## 機能

以下のconsole文を自動でハイライトします：

- `console.log()`
- `console.warn()`
- `console.error()`
- `console.info()`
- `console.debug()`

## インストール

1. VSCodeを開く
2. `Cmd+Shift+P`（Windows: `Ctrl+Shift+P`）
3. 「Extensions: Install from VSIX...」を選択
4. `console-highlight-1.0.0.vsix`を選択

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

## License

ISC
