const express = require('express');
const router = express.Router();
const models = require('../models');

router.get('./', (req, res) => {
    models.alumno.findAll({
        attributes: ["id", "nombre", "id_carrera"],
        /////////se agrega la asociacion 
        include: [{ as: 'Carrera-Relacionada', model: models.carrera, attributes: ["id", "nombre"] }]
        ////////////////////////////////
    }).then(alumno => res.send(alumno)).catch(() => res.sendStatus(500));
})

router.post('/nuevoAlumno', (req, res) => {
    const { nombre, id_carrera } = req.body;
    models.alumno
        .findOne({
            attributes: ["id", "nombre"],
            where: { nombre }
        }).then(al => al ? res.status(400).send({ message: 'Bad request: existe otro alumno con el mismo nombre' }) :
        models.alumno
            .create({ nombre: req.body.nombre, id_carrera: req.body.id_carrera})
            .then(alumno => res.status(200).send(alumno.nombre))
        ).catch((error) => {
            console.log(`Error al intentar insertar en la base de datos: ${error}`)
            res.sendStatus(500)
        })
})

module.exports = router;
