const express = require('express');
const router = express.Router();

/* Importaciones personales */
const { obtenerCursos, crearCursos, actualizarCursos, eliminarCursos } = require('../controllers/cursos.controlller');
const { verifyAuth } = require('../utils/verificador-autenticar');

/* Listar cursos */
router.get('/cursosAgregados', verifyAuth, obtenerCursos);
router.post('/create', verifyAuth, crearCursos);
router.put('/update/:idCurso', verifyAuth, actualizarCursos);
router.delete('/delete/:idCurso', verifyAuth, eliminarCursos);

module.exports = router;