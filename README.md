# wedding-invitation

# outline
結婚式のweb招待状を作成しました。<br>
デザインは別の方に起こしていただき、私はAmplify Authモジュールを用いたログイン機能の実装、画像のアップロード、出席情報送信の実装等を行っております。

URL: https://d2i4cetdp3gvsq.cloudfront.net/ <br>
- ログイン情報は別途お伝えいたします
- 実際のページでは独自ドメインを取得し、DNSレコードを設定して独自ドメインからアクセスできるようにしました

## 主な機能

- Indexページにおける結婚パーティ情報の表示
- Attendanceページにて出席情報のフォーム送信 (googleフォームを使用しています)
- Galleryページにて新郎新婦の写真閲覧・出席者からの画像投稿 (amplifyよりプロビジョンされたS3バケットへ画像を送信)

## 使用技術スタック

- Vue 3 Composition API
- AWS Amplifyによる認証・データ投稿機能の実装
- AWS S3+CloudFrontによる静的サイトホスティング
- adobe webfontの利用

# 各種コマンド
## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Deploy
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
