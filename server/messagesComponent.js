/*Import block  below for libraries*/
const moment = require('moment');


function formatMsg(nickname, txt) {
    return {
        nickname,
        txt,
        timeStamp: moment().format('h:mm a') // format timestamp so its can fit in screen 
    }

}

// export class
module.exports = formatMsg;