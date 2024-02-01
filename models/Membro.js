const { Schema, model } = require("mongoose");

const MembroSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
  equipe: {
    type: String,
    required: true,
    default: "Roosters",
  },
});

module.exports = model("Membro", MembroSchema, "membros");
