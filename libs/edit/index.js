'use strict';

//マークダウンにコンバート
const convertMD = (rows) => {
    //||LT: 未定	|未定 |
    //||LT: 未定	|未定 |
    let text = '';
    for(let i = 0,len=rows.length; i<len; i++){
        const head = `LT`;
        const newline = (i<len-1) ? '\n' : '\n|21:00'; 
        rows[i][1] = rows[i][1] ? rows[i][1] : '未定';
        rows[i][2] = rows[i][2] ? rows[i][2] : '未定';
        text += `||${head}: ${rows[i][1]} | ${rows[i][2]} | ${rows[i][3]}分枠 ${newline}`;
    }
    return text;
}

//書き換え
const rewrite = (eventBody, updateText) => eventBody.replace(/\|\|LT:([\s\S]*)\|21:00/, updateText);

module.exports = {
    convertMD: convertMD,
    rewrite: rewrite
}