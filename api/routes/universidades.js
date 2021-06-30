var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  models.universidad
    .findAll({
      attributes: ["id_universidad", "nombre"]
    })
    .then(universidades => res.send(universidades))
    .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
  models.universidad
    .create({ nombre: req.body.nombre })
    .then(universidad => res.status(201).send({ id_universidad: universidad.id_universidad }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra universidad con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findCarrera = (id_universidad, { onSuccess, onNotFound, onError }) => {
  models.universidad
    .findOne({
      attributes: ["id_universidad", "nombre"],
      where: { id_universidad }
    })
    .then(universidad => (universidad ? onSuccess(universidad) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id_universidad", (req, res) => {
  findCarrera(req.params.id_universidad, {
    onSuccess: universidad => res.send(universidad),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id_universidad", (req, res) => {
  const onSuccess = universidad =>
    universidad
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otra universidad con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findCarrera(req.params.id_universidad, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id_universidad", (req, res) => {
  const onSuccess = universidad =>
    universidad
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findCarrera(req.params.id_universidad, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;
