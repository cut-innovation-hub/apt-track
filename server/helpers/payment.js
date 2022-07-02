const moment = require("moment");

// calculate next payment date
const  calculateNextPayment = (chargeType, normalDate) =>{
    let currentDate;
    if(!chargeType){
        return null
    }
    if(chargeType === 'Weekly'){
        currentDate = moment(normalDate)
        currentDate.add(7, 'days').format('YYYY-MM-DD hh:mm')
        return currentDate;
    }else if(chargeType === 'Monthly'){
        currentDate = moment(normalDate)
        currentDate.add(30, 'days').format('YYYY-MM-DD hh:mm')
        return currentDate;
    }
}

module.exports.calculateNextPayment = calculateNextPayment;