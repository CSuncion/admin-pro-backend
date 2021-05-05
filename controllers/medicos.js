const { response } = require('express');

const Medico = require('../models/medico');

const getMedicos = async (req, res) => {
    const medicos = await Medico.find()
    .populate('usuario', 'nombre img')
    .populate('hospital', 'nombre');
    res.json({
        ok: true,
        medicos
    });
};
const postMedico = async (req, res = response) => {
    const uid = req.uid;

    const medico = new Medico({
        usuario: uid,
        ...req.body
    });

    try {

        const medicoDB = await medico.save();

        res.json({
            ok: true,
            medico: medicoDB
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }
}

const putMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'putMedico'
    })
}


const deleteMedico = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteMedico'
    })
}

module.exports = {
    getMedicos,
    postMedico,
    putMedico,
    deleteMedico
}