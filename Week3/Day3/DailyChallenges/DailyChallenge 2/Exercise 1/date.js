function getTimeUntilNewYear(now = new Date()) {
  const nextNewYear = new Date(now.getFullYear() + 1, 0, 1);
  const remainingMilliseconds = Math.max(0, nextNewYear - now);

  return formatDuration(remainingMilliseconds);
}

function formatDuration(milliseconds) {
  const totalSeconds = Math.floor(milliseconds / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;
}

module.exports = getTimeUntilNewYear;