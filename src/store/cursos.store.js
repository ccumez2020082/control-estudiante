const model = require('../model/cursos.model');
const modelUsuario = require('../model/usuario.model');

async function list(maestro) {
    return await model.find({ maestro });
}

async function findOne(nombre) {
    return await model.findOne({ nombre });
}

async function create(body) {
    const newModel = new model(body);
    return await newModel.save();
}

async function update(id, body) {
    return await model.findByIdAndUpdate(id, body, { new: true });
}

async function findById(id, curso) {
    return await modelUsuario.findByIdAndUpdate(id, { $push: { cursos: curso } }, { new: true });
}

async function findOneCurseOwn(id) {
    return await model.findOne({ _id: id });
}

async function findAllCurso(id, rol) {
    return await modelUsuario.find({ curso: id, rol });
}

async function updateAll(id, curso) {
    return await modelUsuario.findByIdAndUpdate(id, { $set: { curso: curso } });
}

async function removeCourse(id) {
    return await model.findByIdAndDelete(id);
}

module.exports = {
    list,
    findOne,
    create,
    update,
    findById,
    findOneCurseOwn,
    findAllCurso,
    updateAll,
    removeCourse,
};