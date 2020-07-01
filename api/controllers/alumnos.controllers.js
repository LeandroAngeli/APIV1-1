const models = require('../models');

const getAlumnos = async (req, res) => {
    const { numPagina, tamanioPagina } = req.query;
    console.log(typeof numPagina);
    console.log(typeof tamanioPagina);

    try {
        const alumnos = await models.alumno.findAll({
            attributes: ["id", "nombre", "id_carrera"],
            include: [{ as: 'Carrera-Relacionada', model: models.carrera, attributes: ["id", "nombre"] }],
            offset: (Number(numPagina)- 1) * Number(tamanioPagina),
            limit: Number(tamanioPagina)
        });
        res.send(alumnos);
    } catch{
        res.sendStatus(500);
    }
    
}

const agregarAlumno = (req, res) => {
    const { nombre, id_carrera } = req.body;
    models.alumno
        .findOne({
            attributes: ["id", "nombre"],
            where: { nombre }
        }).then(al => al ? res.status(400).send({ message: 'Bad request: existe otro alumno con el mismo nombre' }) :
            models.alumno
                .create({ nombre, id_carrera })
                .then(alumno => res.status(200).send(alumno.nombre))
        ).catch((error) => {
            console.log(`Error al intentar insertar en la base de datos: ${error}`)
            res.sendStatus(500)
        })
}

const findAlumnoId = (id, { onSuccess, onNotFound, onError }) => {
    models.alumno
        .findOne({
            attributes: ["id", "nombre"],
            where: { id }
        })
        .then(alumno => (alumno ? onSuccess(alumno) : onNotFound()))
        .catch(() => onError());
};

const getAlumnoId = (req, res) => {
    findAlumnoId(req.params.id, {
        onSuccess: alumno => res.send(alumno),
        onNotFound: () => res.sendStatus(404),
        onError: () => res.sendStatus(500)
    });
}

const actualizarAlumno = (req, res) => {
    const onSuccess = alumno => {
        models.alumno.findOne({
            where: { nombre: req.body.nombre }
        })
            .then(al => al ? res.status(400).send({ message: 'Bad request: existe otro alumno con el mismo nombre' }) :
                alumno.update({ nombre: req.body.nombre }, { fields: ["nombre"] })
                    .then(response => res.send(response))
            )
            .catch(error => console.log(error))
    }

    findAlumnoId(req.params.id, {
        onSuccess,
        onNotFound: () => res.sendStatus(404),
        onError: (error) => {
            console.log(`Error: ${error}`)
            res.sendStatus(500)
        }
    })
}

const eliminarAlumno = (req, res) => {
    const onSuccess = alumno =>
        alumno
            .destroy()
            .then(() => res.status(200).send(`${alumno.nombre} eliminado`))
            .catch(() => res.sendStatus(500));
    findAlumnoId(req.params.id, {
        onSuccess,
        onNotFound: () => res.sendStatus(404),
        onError: () => res.sendStatus(500)
    })
}

module.exports = {
    getAlumnos,
    agregarAlumno,
    getAlumnoId,
    actualizarAlumno,
    eliminarAlumno
};