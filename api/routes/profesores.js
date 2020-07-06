var express = require("express");
var router = express.Router();
var models = require("../models");

router.get("/", (req, res) => {
  console.log("Esto es un mensaje para ver en consola");
  const paginaActual = parseInt(req.query.numeroDePagina);
  const limite = parseInt(req.query.cantidadColumnas);

  models.profesor
    .findAll({
      attributes: ["id", "nombre", "id_materia"],
      include:[{as:'Materia-Relacionada', model:models.materia, attributes: ["id","nombre"]}],
      offset: (paginaActual-1) * limite,
      limit: limite
    })
    .then(profesor => res.send(profesor))
    .catch(() => res.sendStatus(500));
});

router.post("/", (req, res) => {
  models.profesor
    .create({ nombre: req.body.nombre, id_materia: req.body.id_materia})
    .then(profesor => res.status(201).send({ id: profesor.id }))
    .catch(error => {
      if (error == "SequelizeUniqueConstraintError: Validation error") {
        res.status(400).send('Bad request: existe otra profesor con el mismo nombre')
      }
      else {
        console.log(`Error al intentar insertar en la base de datos: ${error}`)
        res.sendStatus(500)
      }
    });
});

const findProfesor = (id, { onSuccess, onNotFound, onError }) => {
  models.profesor
    .findOne({
      attributes: ["id", "nombre", "id_materia"],
      where: { id }
    })
    .then(alumno => (alumno ? onSuccess(alumno) : onNotFound()))
    .catch(() => onError());
};

router.get("/:id", (req, res) => {
  findProfesor(req.params.id, {
    onSuccess: alumno => res.send(alumno),
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.put("/:id", (req, res) => {
  const onSuccess = alumno =>
    alumno
      .update({ nombre: req.body.nombre, id_materia: req.body.id_materia },{ fields: ["nombre", "id_materia"] })
      .then(() => res.sendStatus(200))
      .catch(error => {
        if (error == "SequelizeUniqueConstraintError: Validation error") {
          res.status(400).send('Bad request: existe otro alumno con el mismo nombre')
        }
        else {
          console.log(`Error al intentar actualizar la base de datos: ${error}`)
          res.sendStatus(500)
        }
      });
    findProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});

router.delete("/:id", (req, res) => {
  const onSuccess = alumno =>
    alumno
      .destroy()
      .then(() => res.sendStatus(200))
      .catch(() => res.sendStatus(500));
  findProfesor(req.params.id, {
    onSuccess,
    onNotFound: () => res.sendStatus(404),
    onError: () => res.sendStatus(500)
  });
});


module.exports = router;