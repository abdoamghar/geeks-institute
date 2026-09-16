function getNextHoliday(now = new Date()) {
  const holidayName = "Christmas Day";
  let holidayDate = new Date(now.getFullYear(), 11, 25);

  if (holidayDate <= now) {
    holidayDate = new Date(now.getFullYear() + 1, 11, 25);
  }

  return {
    today: now.toDateString(),
    holidayName,
    holidayDate: holidayDate.toDateString(),
    timeRemaining: formatDuration(holidayDate - now),
  };
}

function formatDuration(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
}

module.exports = getNextHoliday;