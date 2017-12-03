'use strict';

const cron = require('cron'); //定期実行用
const puppeteer = require('puppeteer');
const devices = require('puppeteer/DeviceDescriptors');
const iPhone = devices['iPhone 6'];

const connpass = require('./libs/connpass'); //ターゲットとなるURLを生成
const getSpreadSheet = require('./libs/spreadsheet'); //スプレッドシートにアクセス
const edit = require('./libs/edit'); //編集系
const lineNotify = require('./libs/line'); //LINE通知系
const LOGIN = require('./config'); //connpassログイン情報

const main = async () => {
    console.log('connecting connpass...');
    const browser = await puppeteer.launch({headless: true});
    const page = await browser.newPage();
    await page.emulate(iPhone);

    //最新の管理イベント情報の特定
    const eventInfo = await connpass();
    const EVENT_URL = eventInfo.url;
    const EVENT_VOL = eventInfo.vol;
    const EVENT_ENTRY_NUM = eventInfo.entryNum;

    //ログイン
    await page.goto(EVENT_URL);
    await page.type(`input[name=username]`, LOGIN.connpassuser);
    await page.type(`input[name=password]`, LOGIN.connpasspass);
    await page.click(`#login_form button`);

    //概要を取得
    await page.waitFor(`#id_description_input`);
    const connpassBody = await page.evaluate(() => Promise.resolve(document.getElementById(`id_description_input`).value));
    console.log(`概要取得done`);

    //概要を編集 スプレットシートにアクセス
    const ssBody = await getSpreadSheet(EVENT_VOL);
    console.log(`スプレットシートアクセスdone`);

    const markdown = edit.convertMD(ssBody);
    console.log(`MD変換done`);

    const newEventBody = edit.rewrite(connpassBody, markdown);
    console.log(`イベント概要マージ`);

    //変更を保存
    await page.evaluate((text) => document.getElementById(`id_description_input`).value = text, newEventBody);
    await page.click(`input[value=保存]`);
    console.log(`保存done`);

    //撮影
    await page.waitFor(1000);
    await page.close();
    browser.close();

    lineNotify(`connpassを更新しました。 ${new Date()}。現在参加者${EVENT_ENTRY_NUM}人です。`);
};

//定期実行
const job1 = new cron.CronJob({
    cronTime: '*/60 * * * *', //*/60 * * * * 60分毎に実行
    onTick: () => main(), //メインの処理
    start: false,
    timeZone: 'Asia/Tokyo'
});

console.log('job1 status', job1.running); // job1 status undefined
job1.start(); // job 1 started
console.log('job1 status', job1.running); // job1 status true

// main();