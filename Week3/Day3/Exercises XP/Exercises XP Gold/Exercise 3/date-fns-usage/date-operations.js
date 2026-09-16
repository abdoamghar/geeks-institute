const { addDays, format } = require("date-fns");

function displayDateOperations() {
  const currentDate = new Date();
  const dateInFiveDays = addDays(currentDate, 5);
  const formattedDate = format(dateInFiveDays, "EEEE, MMMM d, yyyy 'at' h:mm a");

  console.log(`Date in five days: ${formattedDate}`);
  return formattedDate;
}

module.exports = displayDateOperations;