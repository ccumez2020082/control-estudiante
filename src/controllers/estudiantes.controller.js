const { registrar } = require('./autenticador.controller');
const { findByID, findUpdate, findUser, findAndUpdate, removeUser, findUserOne } = require('../store/estudiante.store');
const RESPONSE = require('../utils/respuesta');

function agregar(req, res) {
    registrar(req, res, 'ROL_ALUMNO');
}

function agregarCursos(req, res) {
    const { curso } = req.body;

    if (req.usuario.rol !== 'ROL_ALUMNO') {
        return RESPONSE.error(req, res, 'Eres profesor no pueder agragar cursos a alumnos.', 404);
    }

    findByID(req.usuario.sub)
        .then((usuarioEncontrada) => {
            if (usuarioEncontrada) {
                if (usuarioEncontrada.curso.length > 2) {
                    return RESPONSE.error(req, res, 'Ya no puedes asignar más cursos.', 404);
                } else if (usuarioEncontrada.curso.find((element) => element == curso)) {
                    return RESPONSE.error(req, res, 'Este curso ya existe.', 500);
                } else {
                    findUpdate(req.usuario.sub, curso)
                        .then((curso) => {
                            !curso ? RESPONSE.error(req, res, 'No se puede encontrar el curso.', 500) : RESPONSE.success(req, res, curso, 200);
                        })
                        .catch((err) => {
                            console.log(err);
                            return RESPONSE.error(req, res, 'Error interno', 500);
                        });
                }
            } else {
                return RESPONSE.error(req, res, 'El usuario no se a podido encontrar.', 500);
            }
        })
        .catch((err) => {
            console.log(err);
            return RESPONSE.error(req, res, 'Error interno', 500);
        });
}

function listarCursos(req, res) {
    if (req.usuario.rol !== 'ROL_ALUMNO') {
        return RESPONSE.error(req, res, 'No eres alumno para ver tus cursos.', 401);
    }

    findUser(req.usuario.sub)
        .then((usuarioEncontrada) => {
            !usuarioEncontrada
                ?
                RESPONSE.error(req, res, 'Usuario no encontrado', 500) :
                RESPONSE.success(req, res, usuarioEncontrada.curso, 200);
        })
        .catch((err) => {
            console.log(err);
            return RESPONSE.error(req, res, 'Error interno', 500);
        });
}

function updateMe(req, res) {
    if (req.usuario.rol !== 'ROL_ALUMNO') {
        return RESPONSE.error(req, res, 'No eres alumno para modificar este perfil.', 401);
    }

    if (req.usuario.sub) {
        const parametros = req.body;
        delete usuario;
        delete password;
        delete _id;
        delete rol;
        findAndUpdate(req.usuario.sub, parametros)
            .then((usuarioModificado) => {
                !usuarioModificado ? RESPONSE.error(req, res, 'No viene usuario', 500) : RESPONSE.success(req, res, usuarioModificado, 200);
            })
            .catch((err) => {
                console.log(err);
                return RESPONSE.error(req, res, 'Error interno', 500);
            });
    } else {
        return RESPONSE.error(req, res, 'No puedes editar este perfil.', 500);
    }
}

function deleteMe(req, res) {
    if (req.usuario.sub) {
        removeUser(req.usuario.sub)
            .then((eliminado) => {
                !eliminado ? RESPONSE.error(req, res, 'Error al eliminar', 500) : RESPONSE.success(req, res, 'Usuario eliminado!!!', 200);
            })
            .catch((err) => {
                console.log(err);
                return RESPONSE.error(req, res, 'Error interno', 500);
            });
    } else {
        return RESPONSE.error(req, res, 'No puedes eliminar este usuario.');
    }
}

module.exports = {
    agregar,
    agregarCursos,
    listarCursos,
    updateMe,
    deleteMe
};