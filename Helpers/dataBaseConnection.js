const Membro = require("../models/Membro.js");
const Ponto = require("../models/Ponto.js");
const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose
    .connect(process.env.mongoToken)
    .then(async () => {
      console.log("Connected to mongo");

      //aprendendo a mexer no mongo
      /* const test = await Membro.findById("65bbfc16d56f7ed8543784b8").exec();

      const pessoa = await Ponto.create({
        membro: test._id,
      });

      console.log(pessoa); */
    })
    .catch((error) => console.error(error));
};
