var models = require("../models");

const getInstitutos = async (req, res) => {
    const { numPagina, tamanioPagina } = req.query;
    console.log(typeof numPagina);
    console.log(typeof tamanioPagina);
    try {
        const institutos = await models.instituto.findAll({
            attributes: ["id", "nombre"],
            offset: (Number(numPagina) - 1) * Number(tamanioPagina),
            limit: Number(tamanioPagina)
        });
        res.send(institutos);
    } catch{
        res.sendStatus(500);
    }
}

const crearInstituto = async (req, res) => {
    const { nombre } = req.body;
    console.log(nombre);

    try {
        const instituto = await models.instituto.findOne({
            attributes: ['id', 'nombre'],
            where: { nombre }
        })
        if (instituto) {
            res.status(400).send({ message: 'Bad request: existe otro instituto con el mismo nombre' })
        } else {
            const nuevoInstituto = await models.instituto
                .create({ nombre })
            res.status(201).send({ id: nuevoInstituto.id })
        }
    } catch (error) {
        res.status(500).send(`Error al intentar insertar en la base de datos: ${error}`)
    }
}

const findInstitutoId = async (id) => {
    const instituto = await models.instituto
        .findOne({
            attributes: ["id", "nombre"],
            where: { id }
        })
    return instituto
}

const getInstitutoId = async (req, res) => {
    try {
        const instituto = await findInstitutoId(req.params.id)
        instituto ? res.send(instituto) : res.sendStatus(404)
    } catch{
        res.sendStatus(500);
    }
}

const actualizarInstituto = async (req, res) => {
    const { nombre } = req.body;
    try {
        const instituto = await findInstitutoId(req.params.id);
        if (instituto) {
            const existeInstituto = await models.instituto.findOne({
                attributes: ["id", "nombre"],
                where: { nombre }
            })
            if (existeInstituto) {
                res.status(400).send('Bad request: existe otro instituto con el mismo nombre')
            } else {
                await models.instituto
                    .update({ nombre }, { where: { id: req.params.id }, fields: ["nombre"] })
                res.sendStatus(200)
            }
        } else {
            res.sendStatus(404);
        }
    } catch (error) {
        res.status(500).send(`Error al intentar actualizar la base de datos: ${error}`)
    }
}

const eliminarInstituto = async (req, res) => {
    const instituto = await findInstitutoId(req.params.id)
    try {
        if (instituto) {
            models.instituto.destroy({where:{id: req.params.id}})
            res.sendStatus(200)
        } else {
            res.sendStatus(404)
        }
    } catch{
        res.sendStatus(500)
    }
}

    module.exports = {
        getInstitutos,
        crearInstituto,
        getInstitutoId,
        actualizarInstituto,
        eliminarInstituto
    }