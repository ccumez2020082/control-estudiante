const jwt = require('jwt-simple');
const moment = require('moment');
const SECRET = 'control_alumno';

exports.createToken = function(usuario) {
    let payload = {
        sub: usuario._id,
        nombre: usuario.nombre,
        usuario: usuario.usuario,
        rol: usuario.rol,
        cursos: usuario.cursos,
        iat: moment().unix(),
        exp: moment().day(10, 'days').unix(),
    };
    return jwt.encode(payload, SECRET);
};