const getNextHoliday = require("./date");

const holiday = getNextHoliday();
console.log(`Today is ${holiday.today}.`);
console.log(`The next holiday is ${holiday.holidayName} on ${holiday.holidayDate}.`);
console.log(`Time until the holiday: ${holiday.timeRemaining}`);