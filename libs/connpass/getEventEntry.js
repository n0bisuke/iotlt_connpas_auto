'use strict';

const axios = require('axios');
const BASEPATH = `https://connpass.com/event/`;

const main = async (eventId) => {
    const res = await axios.get(BASEPATH+eventId);
    const html = res.data;
    const body = html.match(/<\/span>参加者一覧（(.*?)人）<\/a>/);
    const entryNum = body[1];

    return entryNum;
}

module.exports = main;