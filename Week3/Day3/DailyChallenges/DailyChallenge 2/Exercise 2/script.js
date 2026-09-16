const readline = require("readline");
const getMinutesLived = require("./date");

const birthdate = "1995-06-15T00:00:00";

console.log(`Minutes lived: ${getMinutesLived(birthdate)}`);

if (process.argv.includes("--prompt")) {
  const interface = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  interface.question("Enter your birthdate (YYYY-MM-DD): ", (answer) => {
    try {
      console.log(`Minutes lived: ${getMinutesLived(answer)}`);
    } catch (error) {
      console.error(error.message);
      process.exitCode = 1;
    } finally {
      interface.close();
    }
  });
}