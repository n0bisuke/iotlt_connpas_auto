'use strcit';

const axios = require('axios');
const qs = require('querystring');
const BASE_URL = 'https://notify-api.line.me';
const PATH =  '/api/notify';
const LINE_NOTIFY_TOKEN = require('../../config').LINE_NOTIFY_TOKEN; //LINE Notifyのトークン

module.exports = async (mes) => {
    let config = {
        baseURL: BASE_URL,
        url: PATH,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${LINE_NOTIFY_TOKEN}`
        },
        data: qs.stringify({
            message: mes,
        })
    };
    
    const res = await axios.request(config);
    return res;
}