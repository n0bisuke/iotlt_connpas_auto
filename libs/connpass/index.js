'use strict';

const getconnpass = require('./getconnpass');
const getEventEntry = require('./getEventEntry');
const BASE_URL = `https://connpass.com`;
const TARGET_URL = `https://connpass.com/login/?next=https%3A//connpass.com/event`

module.exports = async () => {
    const res = await getconnpass();
    const EVENTID = res.event_id; //最新のIoTLTイベントID
    const vol = 'vol'+res.title.match(/vol.(\d{2})/)[1]; //vol何回目か
    const entryNum = await getEventEntry(EVENTID);

    return {
        url: `${TARGET_URL}/${EVENTID}/edit/basic`,
        vol: vol,
        entryNum: entryNum
    };
};