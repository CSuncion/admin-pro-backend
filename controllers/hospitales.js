const { response } = require('express');

const Hospital = require('../models/hospital');


const getHospitales = async (req, res) => {
    const hospitales = await Hospital.find()
        .populate('usuario', 'nombre img');
    res.json({
        ok: true,
        hospitales
    });
};

const postHospital = async (req, res = response) => {

    const uid = req.uid;
    const hospital = new Hospital({
        usuario: uid,
        ...req.body
    });
    try {

        const hospitalDB = await hospital.save();

        res.json({
            ok: true,
            hospital: hospitalDB
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            msg: 'Comuniquese con el administrador'
        })
    }


}

const putHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'putHospital'
    })
}


const deleteHospital = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'deleteHospital'
    })
}

module.exports = {
    getHospitales,
    postHospital,
    putHospital,
    deleteHospital
}