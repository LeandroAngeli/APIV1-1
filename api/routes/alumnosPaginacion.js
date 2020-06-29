var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
    const cantidadAVer = parseInt(req.query.cantidadAVer);
    const paginaActual = parseInt(req.query.paginaActual);

    models.alumno
      .findAll({
        attributes: ["id", "nombre", "id_carrera"],
        include:[{as:'Carrera-Relacionada', model:models.carrera, attributes: ["id","nombre"]}],
        offset: (paginaActual - 1) * cantidadAVer, 
        limit: cantidadAVer        
      })
      .then(alumno => res.send(alumno))
      .catch(() => res.sendStatus(500));
  });


  module.exports = router;
