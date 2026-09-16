const millisecondsPerMinute = 60 * 1000;

function getMinutesLived(birthdate) {
  const birthDate = new Date(birthdate);

  if (Number.isNaN(birthDate.getTime())) {
    throw new Error("Please provide a valid birthdate.");
  }

  const elapsedMilliseconds = Date.now() - birthDate.getTime();
  return Math.floor(elapsedMilliseconds / millisecondsPerMinute);
}

module.exports = getMinutesLived;