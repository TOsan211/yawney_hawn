# yawney_hawn

GitHub Pages で公開するための静的サイトプロジェクトです。

## フォルダ構成

```
yawney_hawn/
├── src/                # 開発用ソース（テンプレート/コンポーネント等を置く場所）
├── assets/             # 開発用アセット（source of truth）
│   ├── css/
│   │   └── style.css
│   ├── js/
│   │   └── main.js
│   └── img/
├── public/              # 開発用エントリーポイント（../assets を参照）
│   └── index.html
├── docs/                # ★ GitHub Pages 公開フォルダ（自己完結）
│   ├── index.html
│   └── assets/
│       ├── css/style.css
│       ├── js/main.js
│       └── img/
├── .gitignore
└── README.md
```

## GitHub Pages 公開について

GitHub の Settings → Pages で選べる公開元フォルダは **`/ (root)` または `/docs` の2択のみ**で、
`/public` は選択肢に存在しません。そのため、このプロジェクトでは `docs/` を実際の公開フォルダとして使います。

- `public/` … 開発用のエントリーポイント。`assets/` を `../assets/...` で参照（編集の起点）
- `docs/`   … `public/index.html` と `assets/` の内容をコピーし、パスを `assets/...`（相対）に調整した**自己完結フォルダ**。これがそのまま公開される

`assets/` や `public/index.html` を編集したら、`docs/` にも同じ変更を反映してください。

```bash
cp public/index.html docs/index.html
cp assets/css/style.css docs/assets/css/style.css
cp assets/js/main.js docs/assets/js/main.js
```

## ローカルでの確認

```bash
npx serve docs
```

## 公開手順

1. GitHub にリポジトリを作成し push（下記コマンド参照）
2. GitHub → Settings → Pages → Branch: `main` / Folder: `/docs` を選択
3. 数分後、`https://TOsan211.github.io/yawney_hawn/` でアクセス可能

```bash
git init
git add .
git commit -m "initial commit"
git branch -M main
git remote add origin https://github.com/TOsan211/yawney_hawn.git
git push -u origin main
```
