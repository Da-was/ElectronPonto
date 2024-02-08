const { Schema, model, SchemaTypes } = require("mongoose");

const PontoSchema = new Schema({
  data: {
    type: Date,
    required: true,
    min: "2024/02/01",
    default: () => new Date().toLocaleString(),
  },
  membro: {
    type: SchemaTypes.ObjectId,
    ref: "Membro",
    required: true,
  },
});

module.exports = model("Ponto", PontoSchema, "pontos");
