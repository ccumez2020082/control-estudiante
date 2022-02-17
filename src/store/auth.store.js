const models = require('../model/usuario.model');

async function findWithEmail(model, usuario) {
    return await model.findOne({ usuario });
}

async function findUser(usuario) {
    return await models.findOne({ usuario });
}

async function createUser(usuario) {
    const newUser = new models(usuario);
    return await newUser.save();
}

module.exports = {
    findWithEmail,
    findUser,
    createUser,
};