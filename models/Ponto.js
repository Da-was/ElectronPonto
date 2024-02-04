const { Schema, model, SchemaTypes } = require("mongoose");

const PontoSchema = new Schema({
  _id: String,
  data: {
    type: Date,
    required: true,
    min: "2024/02/01",
    default: () => Date.now(),
  },
  membro: {
    type: SchemaTypes.ObjectId,
    ref: "Membro",
    required: true,
  },
});

module.exports = model("Ponto", PontoSchema, "pontos");
