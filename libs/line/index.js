'use strcit';

const axios = require('axios');
const qs = require('querystring');
const BASE_URL = 'https://notify-api.line.me';
const PATH =  '/api/notify';
const LINE_TOKEN = `bDc9RBIVhzlv0Cx2gmvsplFSa8SluFFJO29yOUY6J4L`;

module.exports = async (mes) => {
    let config = {
        baseURL: BASE_URL,
        url: PATH,
        method: 'post',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': `Bearer ${LINE_TOKEN}`
        },
        data: qs.stringify({
            message: mes,
        })
    };
    
    const res = await axios.request(config);
    return res;
}