var express = require("express");
var router = express.Router();
const carrerasControllers = require('../controllers/carreras.controllers');

router.get('/', carrerasControllers.getCarreras);
router.get('/:id', carrerasControllers.getCarreraId)
router.post('/nuevaCarrera', carrerasControllers.crearCarrera);
router.put('/actualizarCarrera/:id', carrerasControllers.actualizarCarrera);
router.delete('/eliminarCarrera/:id', carrerasControllers.eliminarCarrera);


module.exports = router;

