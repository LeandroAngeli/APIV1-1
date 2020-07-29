var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  models.alumno_materia
    .findAll({
      attributes: ["id", "id_alumno", "id_materia"],
      include:[{
        as: 'Alumno-Relacionado',
        model: models.alumno,
        attributes: ['id', 'nombre']
      },{
        as: 'Materia-Relacionada',
        model: models.materia,
        attributes: ['id', 'nombre']
      }]
    })
    .then(alumnoMateria => res.send(alumnoMateria))
    .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
  models.alumno_materia
    .create({ id_alumno: req.body.id_alumno, id_materia: req.body.id_materia })
    .then(alumnoMateria => res.status(201).send({ id: alumnoMateria.id }))
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

const findAlumnoMateria = (id, { onSuccess, onNotFound, onError }) => {
  models.alumno_materia
    .findOne({
      attributes: ["id", "id_alumno", "id_materia"],
      where: { id },
      include:[{
        as: 'Alumno-Relacionado',
        model: models.alumno,
        attributes: ['id', 'nombre']
      },{
        as: 'Materia-Relacionada',
        model: models.materia,
        attributes: ['id', 'nombre']
      }]
    })
    .then(alumnoMateria => (alumnoMateria ? onSuccess(alumnoMateria) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findAlumnoMateria(req.params.id, {
    onSuccess: alumnoMateria => res.send(alumnoMateria),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = alumnoMateria =>
    alumnoMateria
      .update({ id_alumno: req.body.id_alumno, id_materia: req.body.id_materia }, { fields: ["id_alumno"] ["id_materia"] })
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
    findAlumnoMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = alumnoMateria =>
    alumnoMateria
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findAlumnoMateria(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

module.exports = router;