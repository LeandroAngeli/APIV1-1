const express = require('express');
const router = express.Router();
const models = require('../models');
const materiasControllers = require('../controllers/materias.controllers');


router.get("/", materiasControllers.getMaterias);

router.post('/nuevaMateria', materiasControllers.agregarMateria);

router.get('/:id', materiasControllers.getMateriaId);

router.put('/actualizarMateria/:id', materiasControllers.actualizarMateria);

router.delete('/eliminarMateria/:id',materiasControllers.eliminarMateria);

module.exports = router;