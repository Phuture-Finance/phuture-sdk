import readline from "readline";

export const yesNo = (question = "Continue") =>
  new Promise((resolve) => {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    rl.question(question + " (y/n): ", (answer) => {
      rl.close();
      resolve(answer.toLowerCase().trim() === "y");
    });
  });
