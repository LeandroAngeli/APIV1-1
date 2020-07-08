var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  const paginaActual = parseInt(req.query.numeroDePagina);
  const limite = parseInt(req.query.cantidadColumnas);

  models.sede
    .findAll({
      attributes: ["id", "nombre"],
      offset: (paginaActual-1) * limite,
      limit: limite
    })
    .then(sedes => res.send(sedes))
    .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
  models.sede
    .create({ nombre: req.body.nombre })
    .then(sede => res.status(201).send({ id: sede.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra sede con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findSede = (id, { onSuccess, onNotFound, onError }) => {
  models.sede
    .findOne({
      attributes: ["id", "nombre"],
      where: { id }
    })
    .then(sede => (sede ? onSuccess(sede) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findSede(req.params.id, {
    onSuccess: sede => res.send(sede),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = sede =>
    sede
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra sede con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findSede(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = sede =>
    sede
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findSede(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
