const { response } = require("express");
const bcrypt = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/jwt");

const getUsuarios = async (req, res) => {
    const desde = Number(req.query.desde) || 0;
    const usuarios = await Usuario.find({}, "nombre email role google")
        .skip(desde)
        .limit(5);
    res.json({
        ok: true,
        usuarios
    });
};

const postUsuarios = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: "El correo ya esta registrado",
            });
        }
        const usuario = new Usuario(req.body);

        // Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        // Guardar usuario
        await usuario.save();


        // Generar el Token - JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Error inesperado... revisar log",
        });
    }
};

const putUsuarios = async (req, res = response) => {
    // TODO: Validar token y comprobar si el usuario es correcto

    const uid = req.params.id;

    // const { nombre, role, email } = req.body;

    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: " No existe un usuario con ese id",
            });
        }

        // Actualizaciones
        const { password, google, email, ...campos } = req.body;
        if (usuarioDB.email !== email) {
            const existeEmail = await Usuario.findOne({ email: req.body.email });
            if (existeEmail) {
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe usuario con ese email",
                });
            }
        }

        campos.email = email;

        const usuarioActualizado = await Usuario.findOneAndUpdate(uid, campos, {
            new: true,
        });

        res.json({
            ok: true,
            usuarioActualizado,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado",
        });
    }
};

const deleteUsuario = async (req, res = response) => {
    const uid = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: " No existe un usuario con ese id",
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario eliminado'
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: "Error inesperado",
        });
    }
};

module.exports = {
    getUsuarios,
    postUsuarios,
    putUsuarios,
    deleteUsuario,
};
