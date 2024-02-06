const mongoose = require("mongoose");

module.exports = async () => {
  await mongoose
    .connect(process.env.mongoToken)
    .then(() => console.log("Connected to mongo"))
    .catch((error) => console.error(error));
};
