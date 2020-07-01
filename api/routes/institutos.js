var express = require("express");
var router = express.Router();
const institutosControllers = require('../controllers/instituto.controllers');

router.get('/', institutosControllers.getInstitutos);
router.get('/:id', institutosControllers.getInstitutoId)
router.post('/nuevoInstituto', institutosControllers.crearInstituto);
router.put('/actualizarInstituto/:id', institutosControllers.actualizarInstituto);
router.delete('/eliminarInstituto/:id', institutosControllers.eliminarInstituto);

module.exports = router;