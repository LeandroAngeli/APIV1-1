var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  models.docente
    .findAll({
      attributes: ["id", "nombre"]
    })
    .then(docente => res.send(docente))
    .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
  models.docente
    .create({ nombre: req.body.nombre })
    .then(docente => res.status(201).send({ id: docente.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra materia con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findDocente = (id, { onSuccess, onNotFound, onError }) => {
  models.docente
    .findOne({
      attributes: ["id", "nombre"],
      where: { id }
    })
    .then(docente => (docente ? onSuccess(docente) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findDocente(req.params.id, {
    onSuccess: docente => res.send(docente),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = docente =>
    docente
      .update({ nombre: req.body.nombre }, { fields: ["nombre"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otro/a alumno/a con el mismo nombre')
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
  const onSuccess = docente =>
    docente
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findDocente(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.patch("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  models.docente
    .findAll({
      attributes: ["id", "nombre", "id_materia"],
      include:[{
        as: 'Materia-Relacionada',
        model: models.materia,
        attributes: ['id', 'nombre', 'id_carrera']
        ,
        include:[{
          as: 'Carrera-Relacionada',
          model: models.carrera,
          attributes: ['id', 'nombre']
        }]
      }],
      limit: 2
    })
    .then(docente => res.send(docente))
    .catch(() => res.sendStatus(500));
});

module.exports = router;