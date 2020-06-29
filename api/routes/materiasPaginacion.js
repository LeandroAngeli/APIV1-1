var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
    const paginaActual = parseInt(req.query.paginaActual);
    const cantidadAVer = parseInt(req.query.cantidadAVer);
  
    try{
      models.materias
      .findAll({
          attributes: ["id", "nombre", "id_carrera"],
          include:[{as:'Carrera-Relacionada', model:models.carrera, attributes: ["id","nombre"]}],
          offset: (paginaActual - 1) * cantidadAVer, 
          limit: cantidadAVer        
        })
        .then(materias => res.send(materias))
        .catch(() => res.sendStatus(500));
    }
    catch{
      console.log("Error")
    }
  });

  module.exports = router;
