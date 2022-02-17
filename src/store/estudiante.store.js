const model = require('../model/usuario.model');

async function findUser(id) {
    return await model.findById(id).populate('curso');
}

async function findByID(id) {
    return await model.findById(id);
}

async function findUpdate(id, curso) {
    return await model.findByIdAndUpdate(id, { $push: { curso } }, { new: true });
}

async function findAndUpdate(id, body) {
    return await model.findByIdAndUpdate(id, body, { new: true });
}

async function removeUser(id) {
    return await model.findByIdAndDelete(id);
}

async function findUserOne(id) {
    return await model.find({ _id: id });
}

module.exports = {
    findUser,
    findByID,
    findUpdate,
    findAndUpdate,
    removeUser,
    findUserOne,
};