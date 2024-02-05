const Membro = require("../models/Membro.js");
const Ponto = require("../models/Ponto.js");
const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose
    .connect(process.env.mongoToken)
    .then(async () => {
      console.log("Connected to mongo");
    })
    .catch((error) => console.error(error));
};
