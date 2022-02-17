const courses = require('./cursos.router');
const alumnos = require('./estudiante.router');
const auth = require('./autenticador.senal');

const routes = (app) => {
    app.use('/cursos', courses);
    app.use('/auth', auth);
    app.use('/alumnos', alumnos);
};

module.exports = routes;