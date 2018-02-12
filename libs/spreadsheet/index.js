'use strict';

const {promisify} = require('util');
const google = require('googleapis');
const sheets = google.sheets('v4');
const ssValuesGetAsync = promisify(sheets.spreadsheets.values.get);
const getOauth2Client = require('./getOauth2Client.js');

const spreadsheetId = `18w_DXUCU9jHtSEu97T1E0Ov6C0t2q8voLwE8yHl53dc`; //iotlt管理シート
const targetArea = `A8:D28`;

const main = async (EVENT_VOL) => {
    const oauth2Client = await getOauth2Client(); //Oauth2Clientの認証情報

    //API経由でシートにアクセス
    const apiOptions = {
        auth: oauth2Client,
        spreadsheetId: spreadsheetId,
        range: `${EVENT_VOL}!${targetArea}`,
    };

    const response = await ssValuesGetAsync(apiOptions);
    return response.values;
};

module.exports = main;
