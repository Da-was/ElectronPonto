const chalk = require("chalk");

const integrationUp = {
  discord: false,
  mongo: false,
};

module.exports = {
  checkAvaible: () => {
    if (!process.env.mongoToken) {
      integrationUp.mongo = true;
    }
    if (process.env.discordHook) {
      integrationUp.discord = true;
    }
  },
  integrations: integrationUp,
};
