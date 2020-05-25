const express = require('express');
const router = express.Router();
const models = require('../models');
const alumnosControllers = require('../controllers/alumnos.controllers');

router.get('/', alumnosControllers.getAlumnos);

router.post('/nuevoAlumno', alumnosControllers.agregarAlumno);

router.get('/:id', alumnosControllers.getAlumnoId );

router.put('/actualizarAlumno/:id', alumnosControllers.actualizarAlumno);

router.delete('/eliminarAlumno/:id', alumnosControllers.eliminarAlumno);


module.exports = router;
