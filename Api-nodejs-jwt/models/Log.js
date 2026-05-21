const mongoose = require('mongoose');

const LogSchema = new mongoose.Schema({
  cpf: { type: String },

  tentativas: [
    {
      senha: String,
      criadoEm: { type: Date, default: Date.now }
    }
  ],

  ip: { type: String },

  celular: { type: String },

  localizacao: {
    cidade: String,
    estado: String,
    pais: String,
    latitude: Number,
    longitude: Number
  },

  criadoEm: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Log', LogSchema);