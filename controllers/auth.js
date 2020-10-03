const {response} = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const {generarJWT} = require('../helpers/jwt');

const login = async(req, res = response) => {

    const {email, password} = req.body;

    try {
        //verificar email
        const usuarioDB = await Usuario.findOne({email});

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Correo electrónico no encontrado'
            });
        }

        //Verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no válida'
            });
        }

        //Generar Token -JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

}

const renewToken = async (req, res = response) => {

    const uid = req.uid;
    
    //Generar Token -JWT
    const token = await generarJWT(uid);


    res.json({
        ok: true,
        token
    });
}

module.exports = {
    login,
    renewToken
}