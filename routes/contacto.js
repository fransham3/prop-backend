
/*
    Ruta: /api/contacto
*/


const {Router} = require('express');
const nodemailer = require('nodemailer');
const router = Router();


router.post('/contacto-propiedad', async (req, res) => {
    const { nombre,
            email,
            telefono,
            tipoConsulta,
            nombrePropiedad,
            linkPropiedad,
            comentario} = req.body;

    
    contentHTML = `
    <div style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            max-width: 600px;
            margin: auto;
            text-align: center;
            font-family: arial;">

        <h1>Información de contacto</h1>

        <p style="color: grey;
            font-size: 18px;">
            ${tipoConsulta}
        </p>

        
            Consulta sobre propiedad: <a style="font-size: 14px; font-weight: bold;" href=${linkPropiedad}>${nombrePropiedad}</a> <br>
            Nombre: <span style="font-weight: bold;">${nombre}</span> <br>
            Correo electrónico: <span style="font-weight: bold;">${email}</span> <br>
            Teléfono: <span style="font-weight: bold;">${telefono}</span> <br>
            Comentario: <span style="font-weight: bold;">${comentario}</span> <br>
        
        
    </div>

    
    `;


    contentHTML2 = `
    <div style="box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
            max-width: 600px;
            margin: auto;
            text-align: center;
            font-family: arial;">

        <h1>Hemos recibido tu consulta</h1>

        <p style="color: grey;
            font-size: 18px;">
            ${tipoConsulta}
        </p>

        
            Consulta sobre propiedad: <a style="font-size: 14px; font-weight: bold;" href=${linkPropiedad}>${nombrePropiedad}</a> <br>
            Comentario: <span style="font-weight: bold;">${comentario}</span> <br>


        <p style="color: grey;
            font-size: 18px;">
            Nos pondremos en contacto contigo a la brevedad.
        </p>
        
        
    </div>

    
    `;

    const transporter = nodemailer.createTransport({
        host: process.env.HOST_NODEMAILER,
        port: 587,
        secure: false,
        auth: {
            user: process.env.USER_NODEMAILER,
            pass: process.env.PASS_NODEMAILER
        },
        tls: {
            rejectUnauthorized: false
        }
    });

    const info = await transporter.sendMail({
        from: "'Contacto Corretajes Nehuen <contacto@corretajesnehuen.cl>'",
        to: "fran.agallardo04@gmail.com",
        subject: `${nombrePropiedad} - ${tipoConsulta}`,
        html: contentHTML
    });

    const info2 = await transporter.sendMail({
        from: "'Contacto Corretajes Nehuen <contacto@corretajesnehuen.cl>'",
        to: `${email}`,
        subject: `${nombre}! recibimos tu formulario de contacto Corretajes Nehuen`,
        html: contentHTML2
    });

    
    

    res.json({
        ok: true
    });
});


module.exports = router;