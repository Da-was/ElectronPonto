const chalk = require("chalk");
chalk.enabled = true;
module.exports = () => {
  if (!process.env.mongoToken) console.error("Mongo Token not added.");
  if (!process.env.discordHook) {
    //testar pra ver se funciona no toten
    console.error(chalk.red("DiscordHook not added."));
  }
};
