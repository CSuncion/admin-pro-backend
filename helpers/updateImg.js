const fs = require('fs');
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const actualizarImagen = async (tipo, id, nombreArchivo) => {
    let pathViejo = '';

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                return false;
            }
            pathViejo = `./uploads/medicos/${medico.img}`;
            if (fs.existsSync(pathViejo)) {
                // Borrar la imagen anterior
                fs.unlinkSync(pathViejo);
            }
            medico.img = nombreArchivo;
            await medico.save();
            return true;
        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!hospital) {
                return false;
            }
            pathViejo = `./uploads/hospitales/${hospital.img}`;
            if (fs.existsSync(pathViejo)) {
                // Borrar la imagen anterior
                fs.unlinkSync(pathViejo);
            }
            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                return false;
            }
            pathViejo = `./uploads/usuarios/${usuario.img}`;
            if (fs.existsSync(pathViejo)) {
                // Borrar la imagen anterior
                fs.unlinkSync(pathViejo);
            }
            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
    }

}

module.exports = {
    actualizarImagen
}