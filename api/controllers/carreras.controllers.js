var models = require("../models");

const getCarreras = async (req, res) => {
    const { numPagina, tamanioPagina } = req.query;
    console.log(typeof numPagina);
    console.log(typeof tamanioPagina);
    try {
        const carreras = await models.carrera.findAll({
            attributes: ["id", "nombre", "id_instituto"],
            include: [{ as: 'Instituto-Relacionado', model: models.instituto, attributes: ["id", "nombre"] }],
            offset: (Number(numPagina) - 1) * Number(tamanioPagina),
            limit: Number(tamanioPagina)
        });
        res.send(carreras);
    } catch{
        res.sendStatus(500);
    }
}

const crearCarrera = async (req, res) => {
    const { nombre,id_instituto } = req.body;

    try {
        const carrera = await models.carrera.findOne({
            attributes: ['id', 'nombre', 'id_instituto'],
            where: { nombre }
        })
        if (carrera) {
            res.status(400).send({ message: 'Bad request: existe otra carrera con el mismo nombre' })
        } else {
            const nuevaCarrera = await models.carrera
                .create({ nombre, id_instituto })
            res.status(201).send({ id: nuevaCarrera.id })
        }
    } catch (error) {
        res.status(500).send(`Error al intentar insertar en la base de datos: ${error}`)
    }
}

const findCarreraId = async (id) => {
    const carrera = await models.carrera
        .findOne({
            attributes: ["id", "nombre", "id_instituto"],
            where: { id }
        })
    return carrera
}

const getCarreraId = async (req, res) => {
    try {
        const carrera = await findCarreraId(req.params.id)
        carrera ? res.send(carrera) : res.sendStatus(404)
    } catch{
        res.sendStatus(500);
    }
}

const actualizarCarrera = async (req, res) => {
    const { nombre, id_instituto } = req.body;
    try {
        const carrera = await findCarreraId(req.params.id);
        if (carrera) {
            const existeCarrera = await models.carrera.findOne({
                attributes: ["id", "nombre", "id_instituto"],
                where: { nombre }
            })
            if (existeCarrera) {
                res.status(400).send('Bad request: existe otra carrera con el mismo nombre')
            } else {
                await models.carrera
                    .update({ nombre, id_instituto }, { where: { id: req.params.id }, fields: ["nombre", "id_instituto"] })
                res.sendStatus(200)
            }
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).send(`Error al intentar actualizar la base de datos: ${error}`)
    }
}

const eliminarCarrera = async (req, res) => {
    const carrera = await findCarreraId(req.params.id)
    try {
        if (carrera) {
            models.carrera.destroy({ where: { id: req.params.id } })
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    } catch{
        res.sendStatus(500)
    }
}

module.exports = {
    getCarreras,
    crearCarrera,
    getCarreraId,
    actualizarCarrera,
    eliminarCarrera
}