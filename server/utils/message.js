const moment = require('moment');

const generateMessage = (from, text) => {
    return {
        from,
        text,
        createdAt: moment().valueOf()
    };
};

const generateLocationMessage = (from, latitude, longtitude) => {
    return {
        from,
        url: `https://google.com/maps?q=${latitude},${longtitude}`,
        createdAt: moment().valueOf()
    }
};


module.exports = {generateMessage, generateLocationMessage};