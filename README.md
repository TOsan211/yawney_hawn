# yawney_hawn

Jekyll で構築し、GitHub Pages (GitHub Actions ビルド) で公開するブログです。

## フォルダ構成

```
yawney_hawn/
├── _config.yml          # Jekyll サイト設定
├── _layouts/            # ページテンプレート (default.html, post.html)
├── _includes/           # 共通パーツ (header.html, footer.html)
├── _posts/              # ブログ記事 (YYYY-MM-DD-title.md)
├── assets/
│   ├── css/style.scss   # サイトCSS (Sass front matter付き)
│   ├── js/main.js
│   └── img/
├── index.html           # トップページ (記事一覧)
├── about.md              # Aboutページ
├── Gemfile
└── .github/workflows/jekyll-gh-pages.yml  # GitHub Actions で build & deploy
```

## ローカル環境構築

```bash
bundle install
bundle exec jekyll serve
```

`http://localhost:4000/` でプレビューできます。

## 新しい記事の書き方

`_posts/` に `YYYY-MM-DD-タイトル.md` という名前でファイルを作成します。

```markdown
---
layout: post
title: "記事タイトル"
---

本文をここに書きます。
```

## 公開の仕組み

`main` ブランチに push すると `.github/workflows/jekyll-gh-pages.yml` が自動的に Jekyll サイトをビルドし、GitHub Pages にデプロイします。

初回のみ、GitHub リポジトリの Settings → Pages → Build and deployment → Source で **GitHub Actions** を選択してください。

```bash
git add .
git commit -m "Set up Jekyll blog"
git push
```

数分後、`https://TOsan211.github.io/yawney_hawn/` でアクセス可能になります。
