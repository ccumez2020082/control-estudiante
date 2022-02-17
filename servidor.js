const mongoose = require('mongoose');
const bcrypt = require('bcrypt-nodejs');
const app = require('./app');
const TEACHER = require('./src/model/usuario.model');
const CURSOS = require('./src/model/cursos.model');

mongoose.Promise = global.Promise;

mongoose
    .connect('mongodb://localhost:27017/controlAlumnos', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        const PORT = 3000;
        app.listen(PORT, () => console.log((`Escuchando http://localhost:${PORT}`)));

        TEACHER.findOne({ nombre: 'MAESTRO', usuario: 'MAESTRO' }, (err, teacherEncontrado) => {
            if (err) return console.log('Error en la creacion del MAESTRO.');

            if (teacherEncontrado) {
                console.log(('El ADMINISTRADOR ya existe'));
                cursosFuncion();
            } else {
                const newTeacher = new TEACHER();
                newTeacher.usuario = 'MAESTRO';
                newTeacher.nombre = 'MAESTRO';
                newTeacher.rol = 'ROL_MAESTRO';

                bcrypt.hash('123456', null, null, (err, passEncriptado) => {
                    if (err) return console.log(err);
                    newTeacher.password = passEncriptado;

                    newTeacher.save((err, teacherGuardado) => {
                        if (err) return console.log('Error en guardar MAESTRO');
                        if (!teacherGuardado) {
                            return console.log('No viene el dato de MAESTRO');
                        } else {
                            console.log(('MAESTRO creado con exito.'));
                            cursosFuncion();
                        }
                    });
                });
            }
        });

        function cursosFuncion() {
            CURSOS.findOne({ nombre: 'DEFAULT' }, (err, courseFind) => {
                if (err) return console.log('Error en la creacion del CURSO.');

                if (courseFind) {
                    return console.log(('El CURSO ya existe.'));
                } else {
                    TEACHER.findOne({ nombre: 'MAESTRO', usuario: 'MAESTRO' }, (err, teacherEncontrado) => {
                        if (err) return console.log('Error en la busqueda de MAESTRO.');

                        const newCourse = new CURSOS();
                        if (teacherEncontrado) {
                            newCourse.nombre = 'DEFAULT';
                            newCourse.teacher = teacherEncontrado._id;
                            newCourse.save((err, cursoGuardado) => {
                                if (err) return console.log('Error guardando el CURSO.');
                                !cursoGuardado
                                    ?
                                    console.log('No viene el dato de CURSO.') :
                                    console.log(('CURSO creado con exito.'));
                            });
                        }
                    });
                }
            });
        }
    })
    .catch((err) => console.log(err));