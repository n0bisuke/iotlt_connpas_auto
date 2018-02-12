


## コマンド

* `npm start` / 実行 1時間に一回
* `npm run git-push` / git pushする
* `npm run exec` / 即実行

## 認証情報

`.gitignore`

```.gitignore
node_modules
libs/spreadsheet/client_secret.json
libs/spreadsheet/sheets.googleapis.com-nodejs-quickstart.json
libs/spreadsheet/backup_async.js
libs/spreadsheet/backup.js
libs/spreadsheet/hoge.js
libs/spreadsheet/createOauth.js
.DS_Store
config.js
```
* spreadsheet - `libs/spreadsheet/client_secret.json libs/spreadsheet/sheets.googleapis.com-nodejs-quickstart. libs/spreadsheet/createOauth.js`
* connpass - config.js
    * `config.js`

```config.js
module.exports = {
    connpassuser: '',
    connpasspass: '',
    targetSheetID: '',
    targetSheetArea: '',
    LINE_NOTIFY_TOKEN: ''
}
```