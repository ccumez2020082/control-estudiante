const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const curso = Schema({
    nombre: String,
    maestro: { type: mongoose.Schema.ObjectId, ref: 'Usuario' },
});

module.exports = mongoose.model('Curso', curso);