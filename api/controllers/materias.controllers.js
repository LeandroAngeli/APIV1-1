const models = require('../models');

const getMaterias = async (req, res) => {
    const { numPagina, tamanioPagina } = req.query;
    console.log(numPagina);
    console.log(tamanioPagina);
    try {
        const materias = await models.materia.findAll({
            attributes: ["id", "nombre", "id_carrera"],
            include: [{ as: 'Carrera-Relacionada', model: models.carrera, attributes: ["id", "nombre"] }],
            offset: (Number(numPagina)- 1) * Number(tamanioPagina),
            limit: Number(tamanioPagina)
        });
        res.send(materias);
    } catch{
        res.sendStatus(500);
    }
}

const agregarMateria = (req, res) => {
    const { nombre, id_carrera } = req.body;
    models.materia
        .findOne({
            attributes: ["id", "nombre"],
            where: { nombre }
        }).then(mat => mat ? res.status(400).send({ message: 'Bad request: existe otra materia con el mismo nombre' }) :
            models.materia
                .create({ nombre, id_carrera })
                .then(materia => res.status(200).send(materia.nombre))
        ).catch((error) => {
            console.log(`Error al intentar insertar en la base de datos: ${error}`)
            res.sendStatus(500)
        })
}

const getMateriaId = (req, res) => {
    findMateriaId(req.params.id, {
        onSuccess: materia => res.send(materia),
        onNotFound: () => {
            res.status(404)
            res.send({ message: "La materia no existe!" })
        },
        onError: () => res.sendStatus(500)
    });
}

const findMateriaId = (id, { onSuccess, onNotFound, onError }) => {
    models.materia
        .findOne({
            attributes: ["id", "nombre"],
            where: { id }
        })
        .then(materia => (materia ? onSuccess(materia) : onNotFound()))
        .catch(() => onError());
}

const actualizarMateria = (req, res) => {

    const onSuccess = materia => {
        models.materia.findOne({
            where: { nombre: req.body.nombre }
        })
            .then(mat => mat ? res.status(400).send({ message: 'Bad request: existe otra materia con el mismo nombre' }) :
                materia.update({ nombre: req.body.nombre }, { fields: ["nombre"] })
                    .then(response => res.send(response))
            )
            .catch(error => console.log(error))
    }
    findMateriaId(req.params.id, {
        onSuccess,
        onNotFound: () => res.sendStatus(404),
        onError: (error) => {
            console.log(`Error: ${error}`)
            res.sendStatus(500)
        }
    })
}

const eliminarMateria = (req, res) => {
    const onSuccess = materia =>
        materia
            .destroy()
            .then(() => res.status(200).send(`${materia.nombre} eliminada`))
            .catch(() => res.sendStatus(500));
    findMateriaId(req.params.id, {
        onSuccess,
        onNotFound: () => res.sendStatus(404),
        onError: () => res.sendStatus(500)
    })
}

module.exports = {
    getMaterias,
    agregarMateria,
    getMateriaId,
    actualizarMateria,
    eliminarMateria
};