const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const usuario = Schema({
    nombre: String,
    usuario: String,
    password: String,
    rol: String,
    cursos: [{ type: mongoose.Schema.ObjectId, ref: 'Curso' }],
});

module.exports = mongoose.model('Usuario', usuario);