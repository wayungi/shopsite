const { v4: uuid } = require('uuid');
const { format } = require('date-fns');
const fs = require('node:fs'); // const fs =  require('fs);
const fsPromises = require('node:fs/promises'); // const fsPromises =  require('fs').promises;
const path =  require('path');

const LogEvents = async (message) => {
    const dateTime = `${format(new Date(), 'yyyyMMdd\tHH:mm:ss')}`;
    const logItem = `${dateTime}\t${uuid()}\t${message}\n`;

    /*
    operations that require server access, filewrites & reads, +more should be in try-catch blocks becausethey could fail.
    */

    try {
        if(!fs.existsSync(path.join(__dirname, 'logs'))) {
            await fsPromises.mkdir(path.join(__dirname, 'logs'));
        }
        await fsPromises.appendFile(path.join(__dirname, 'logs', 'eventLog.txt'), logItem)
    }catch (err) {
       console.log(err)
    }
    
}


module.exports = LogEvents;
