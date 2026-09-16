const path = require("path");
const { Command } = require("commander");
const greet = require("./commands/greet");
const fetchData = require("./commands/fetch");
const readFile = require("./commands/read");

const program = new Command();

program
  .name("ninja-utility")
  .description("A command-line utility with useful Node.js commands")
  .version("1.0.0");

program
  .command("greet")
  .description("Display a colorful greeting")
  .argument("[name]", "name to greet")
  .action(greet);

program
  .command("fetch")
  .description("Fetch and display a post from a public API")
  .action(async () => {
    await fetchData();
  });

program
  .command("read")
  .description("Read and display a text file")
  .argument("<file>", "file to read")
  .action((file) => {
    readFile(path.resolve(process.cwd(), file));
  });

program.parseAsync(process.argv).catch((error) => {
  console.error(`Command failed: ${error.message}`);
  process.exitCode = 1;
});