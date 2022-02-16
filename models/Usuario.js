const mongoose = require("mongoose");

const usuarioSchema = new mongoose.Schema({
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  tipo: {
    type: String,
    enum: ["User", "Staff"],
  },
  nome: {
    type: String,
    min: [5, "Insira seu nome completo"],
    required: true,
  },
  email: {
    type: String,
    required: true,
    min: [5, "Insira um email válido"],
    max: 11,
  },
  cpf: {
    type: String,
    required: true,
    max: 11,
    min: [11, "Seu cpf deve conter 11 digitos"],
  },
  telefone: {
    type: String,
    required: true,
    min: [11, "Seu telefone deve conter 11 digitos"],
    max: 11,
  },
  senha: {
    type: String,
    min: [8, "Sua senha precisa conter pelo menos 8 digitos"],
    required: true,
  },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
