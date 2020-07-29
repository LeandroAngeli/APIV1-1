var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  models.docente_materia
    .findAll({
      attributes: ["id", "id_docente", "id_materia"],
      include:[{
        as: 'Docente-Relacionado',
        model: models.docente,
        attributes: ['id', 'nombre']
      },{
        as: 'Materia-Relacionada',
        model: models.materia,
        attributes: ['id', 'nombre']
      }]
    })
    .then(docenteMateria => res.send(docenteMateria))
    .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
  models.docente_materia
    .create({ id_docente: req.body.id_docente, id_materia: req.body.id_materia })
    .then(docenteMateria => res.status(201).send({ id: docenteMateria.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findDocenteMateria = (id, { onSuccess, onNotFound, onError }) => {
  models.docente_materia
    .findOne({
      attributes: ["id", "id_docente", "id_materia"],
      where: { id },
      include:[{
        as: 'Docente-Relacionado',
        model: models.docente,
        attributes: ['id', 'nombre']
      },{
        as: 'Materia-Relacionada',
        model: models.materia,
        attributes: ['id', 'nombre']
      }]
    })
    .then(docenteMateria => (docenteMateria ? onSuccess(docenteMateria) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findDocenteMateria(req.params.id, {
    onSuccess: docenteMateria => res.send(docenteMateria),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = docenteMateria =>
    docenteMateria
      .update({ id_docente: req.body.id_docente, id_materia: req.body.id_materia }, { fields: ["id_docente"] ["id_materia"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findDocenteMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = docenteMateria =>
    docenteMateria
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findDocenteMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;