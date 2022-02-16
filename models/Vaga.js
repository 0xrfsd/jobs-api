const mongoose = require("mongoose");

const vagaSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tipo: {
    type: String,
    // enum: ["Estágio", "Meio Periodo"],
  },
  instituicao: {
    type: String,
  },
  cargo: {
    type: String,
  },
  descricao: {
    type: String,
  },
  presencial: {
    type: Boolean,
  },
  localidade: {
    type: String,
  },
});

module.exports = mongoose.model("Vaga", vagaSchema);
