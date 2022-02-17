const {
    list,
    findOne,
    create,
    update,
    findById,
    findOneCurseOwn,
    findAllCurso,
    updateAll,
    removeCourse,
} = require('../store/cursos.store');
const RESPONSE = require('../utils/respuesta');

function obtenerCursos(req, res) {
    list(req.usuario.sub)
        .then((cursosEncotrados) => {
            if (cursosEncotrados.length === 0) {
                return RESPONSE.success(req, res, 'No hay ningun curso.', 200);
            }!cursosEncotrados
                ?
                RESPONSE.error(req, res, 'No se encuentra ningun curso.', 500) :
                RESPONSE.success(req, res, cursosEncotrados, 200);
        })
        .catch((err) => {
            console.log(err);
            return RESPONSE.error(req, res, 'Error interno', 500);
        });
}

function crearCursos(req, res) {
    if (req.usuario.rol === 'ROL_ALUMNO') {
        return RESPONSE.error(req, res, 'No tienes los permisos.', 401);
    }
    const { nombre } = req.body;
    if (!nombre) {
        return RESPONSE.error(req, res, 'Faltan parametros.', 500);
    } else {
        findOne(nombre)
            .then((cursoEncontrado) => {
                if (cursoEncontrado) {
                    return RESPONSE.error(req, res, 'Curso ya existente.', 404);
                } else {
                    const curso = {
                        nombre,
                        maestro: req.usuario.sub,
                    };
                    create(curso)
                        .then((curso) => {
                            findById(req.usuario.sub, curso);
                            cursos ? RESPONSE.success(req, res, curso, 201) : RESPONSE.error(req, res, 'Error interno', 500);
                        })
                        .catch((err) => {
                            console.log(err);
                            return RESPONSE.error(req, res, 'Error interno', 500);
                        });
                }
            })
            .catch((err) => {
                console.log(err);
                return RESPONSE.error(req, res, 'Error interno', 500);
            });
    }
}

function actualizarCursos(req, res) {
    if (req.usuario.rol === 'ROL_ALUMNO') {
        return RESPONSE.error(req, res, 'No tienes los permisos', 401);
    }

    const idCurso = req.params.idCurso;
    const parametros = req.body;

    findOneCurseOwn(idCurso)
        .then((curso) => {
            if (curso) {
                if (curso.maestro == req.usuario.sub) {
                    update(idCurso, parametros)
                        .then((cursoModificado) => {
                            !cursoModificado
                                ?
                                RESPONSE.error(req, res, 'No se a podido modificar el curso') :
                                RESPONSE.success(req, res, cursoModificado, 200);
                        })
                        .catch((err) => {
                            console.log(err);
                            return RESPONSE.error(req, res, 'Error interno', 500);
                        });
                } else {
                    return RESPONSE.error(req, res, 'No tienes los permisos para modificar este curso', 401);
                }
            } else {
                return RESPONSE.error(req, res, 'No existe este curso.', 401);
            }
        })
        .catch((err) => {
            console.log(err);
            return RESPONSE.error(req, res, 'Error interno', 500);
        });
}


function removerCurso(req, res) {
    const parametros = req.params.idCurso;

    if (req.user.rol == 'ROL_ALUMNO') {
        return RESPONSE.error(req, res, 'No tienes los permisos', 401);
    }

    /* Curso creado para ver si funciona */
    findOne('DEFAULT')
        .then((defaultEncontrado) => {
            findAllCurso(parametros, 'ROL_ALUMNO')
                .then((peopleEncontrada) => {
                    if (peopleEncontrada.length === 0) {
                        return eliminarCurso(req, res, parametros);
                    } else {
                        peopleEncontrada.forEach((newpeopleEncontrada) => {
                            let position = newpeopleEncontrada.courses.indexOf(parametros);
                            newpeopleEncontrada.courses[position] = defaultEncontrado._id;
                            let data = newpeopleEncontrada.courses;
                            let id = newpeopleEncontrada._id;

                            updateAll(id, data)
                                .then((arrayEliminado) => {
                                    eliminarCurso(req, res, parametros);
                                })
                                .catch((err) => {
                                    console.log(err);
                                    return RESPONSE.error(req, res, 'Error interno', 500);
                                });
                        });
                    }
                })
                .catch((err) => {
                    console.log(err);
                    return RESPONSE.error(req, res, 'Error interno', 500);
                });
        })
        .catch((err) => {
            console.log(err);
            return RESPONSE.error(req, res, 'Error interno', 500);
        });
}

function eliminarCursos(req, res, parametros) {
    removeCourse(parametros)
        .then((datoEliminado) => {
            !datoEliminado
                ?
                RESPONSE.error(req, res, 'Este curso no existe', 404) :
                RESPONSE.success(req, res, 'Curso elimiando con exito!!', 200);
        })
        .catch((err) => {
            console.log(err);
            return RESPONSE.error(req, res, 'Error interno', 500);
        });
}

module.exports = {
    obtenerCursos,
    crearCursos,
    actualizarCursos,
    eliminarCursos,
};