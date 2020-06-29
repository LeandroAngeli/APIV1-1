var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
    const paginaActual = parseInt(req.query.paginaActual);
    const cantidadAVer = parseInt(req.query.cantidadAVer);

    models.carrera
    .findAll({
        attributes: ["id", "nombre"],
        offset: (paginaActual - 1) * cantidadAVer, 
        limit: cantidadAVer       
    })
    .then(carreras => res.send(carreras))
    .catch(() => res.sendStatus(500));
});

module.exports = router;
