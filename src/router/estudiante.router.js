const express = require('express');
const router = express.Router();
const { agregar, agregarCursos, listarCursos, updateMe, deleteMe } = require('../controllers/estudiantes.controller');
const { verifyAuth } = require('../utils/verificador-autenticar');

router.get('/verCursos', verifyAuth, listarCursos);
router.post('/create', agregar);
router.post('/cursos/agregar', verifyAuth, agregarCursos);
router.put('/updateMe', verifyAuth, updateMe);
router.delete('/deleteMe', verifyAuth, deleteMe);

module.exports = router;