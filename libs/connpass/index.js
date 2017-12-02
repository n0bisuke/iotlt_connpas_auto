'use strict';

const getconnpass = require('./getconnpass');
const BASEURL = `https://connpass.com/login/?next=https%3A//connpass.com/event`;

module.exports = async () => {
    const res = await getconnpass();
    const EVENTID = res.event_id; //最新のIoTLTイベントID
    const vol = 'vol'+res.title.match(/vol.(\d{2})/)[1]; //vol何回目か
    console.log(vol);

    return {
        'url': `${BASEURL}/${EVENTID}/edit/basic`,
        'vol': vol
    };
};