# TodoListReRoR

React + Ruby on Railsで作成されたTodoリストアプリケーション

## プロジェクト構成

```
TodoListReRoR/
├── frontend/          # Reactフロントエンド
│   ├── src/          # ソースコード
│   ├── public/       # 静的ファイル
│   └── dist/         # ビルド成果物
└── .github/          # GitHub設定
    └── workflows/    # GitHub Actions設定
```

## セットアップ

### フロントエンド

```bash
cd frontend
npm install
npm run dev
```

## デプロイ

このプロジェクトはGitHub Pagesを使用してデプロイされています。
`master`ブランチへのプッシュ時に自動的にデプロイされます。 