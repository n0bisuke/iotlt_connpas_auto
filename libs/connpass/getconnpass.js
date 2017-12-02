'use strict';

const axios = require('axios');
const moment = require('moment');
const DATE_RANGE = [
    moment().format('YYYYMM'), //今月
    moment().add(1,'months').format('YYYYMM'), //来月
    moment().add(2,'months').format('YYYYMM') //再来月
];
//console.log(DATE_RANGE.join(',')); -> 201712,201801,201802など
const API = `https://connpass.com/api/v1/event/?owner_nickname=n0bisuke&ym=201712,201801,201802${DATE_RANGE.join(',')}&count=20&order=2&keyword=IoTLT`;

const main = async () => {
    const res = await axios.get(API);
    const events = res.data.events;
    let result = {};

    for(let i = 0, len = events.length; i < len; i++){
        if(!events[i].title.match(/IoT縛りの勉強会! IoTLT vol.\d{2}/)) continue; //本体の回以外はスルー
        if(moment().isSameOrAfter(events[i].started_at)) continue; //実施済みイベントはスルー
        result = events[i];
        break;
    }

    return result;
}

module.exports = main;