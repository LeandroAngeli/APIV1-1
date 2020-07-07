var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
    console.log("Esto es un mensaje para ver en consola");
    models.docentes
      .findAll({
        attributes: ["id","nombre", "id_materia"],
        include:[{as:'Materia-Relacionada', model:models.materia, attributes: ["id","nombre"]}]
      })
      .then(docentes => res.send(docentes))
      .catch(() => res.sendStatus(500));
  });
  
  router.get("/pag", (req, res) => {
    const paginaActual = parseInt(req.query.paginaActual);
    const cantidadAVer = parseInt(req.query.cantidadAVer);
  
    models.docentes
      .findAll({
        attributes: ["id","nombre", "id_materia"],
        include:[{as:'Materia-Relacionada', model:models.materia, attributes: ["id","nombre"]}],
        offset:(paginaActual - 1) * cantidadAVer,
        limit: cantidadAVer
      })
      .then(docentes => res.send(docentes))
      .catch(() => res.sendStatus(500));
  });
  
  router.post("/", (req, res) => {
    models.docentes
      .create({ nombre: req.body.nombre, id_materia: req.body.id_materia})
      .then(docentes => res.status(201).send({ id: docentes.id }))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra docente con el mismo nombre')
        }
        else {
          console.log(`Error al intentar insertar en la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
  });
  
  const findDocente = (id, { onSuccess, onNotFound, onError }) => {
    models.docentes
      .findOne({
        attributes: ["id", "nombre","id_materia"],
        where: { id }
      })
      .then(docentes => (docentes ? onSuccess(docentes) : onNotFound()))
      .catch(() => onError());
  };
  
  router.get("/:id", (req, res) => {
    findDocente(req.params.id, {
      onSuccess: docentes => res.send(docentes),
      onNotFound: () => res.sendStatus(404),
      onError: () => res.sendStatus(500)
    });
  });
  
  router.put("/:id", (req, res) => {
    const onSuccess = docentes =>
      docentes
        .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
        .then(() => res.sendStatus(200))
        .catch(error => {
          if (error == "SequelizeUniqueConstraintError: Validation error") {
            res.status(400).send('Bad request: existe otra docente con el mismo nombre')
          }
          else {
            console.log(`Error al intentar actualizar la base de datos: ${error}`)
            res.sendStatus(500)
          }
        });
      findDocente(req.params.id, {
      onSuccess,
      onNotFound: () => res.sendStatus(404),
      onError: () => res.sendStatus(500)
    });
  });
  
  router.delete("/:id", (req, res) => {
    const onSuccess = docentes =>
      docentes
        .destroy()
        .then(() => res.sendStatus(200))
        .catch(() => res.sendStatus(500));
    findDocente(req.params.id, {
      onSuccess,
      onNotFound: () => res.sendStatus(404),
      onError: () => res.sendStatus(500)
    });
  });
  
  module.exports = router; 

