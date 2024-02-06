const { Schema, model } = require("mongoose");

const EquipeSchema = new Schema({
  nome: {
    type: String,
    required: true,
  },
});

module.exports = model("Equipe", EquipeSchema, "equipes");
