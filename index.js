require('dotenv').config();

const express = require('express');
const cors = require('cors')
const multer = require('multer');
const path = require('path');


const { dbConnection } = require('./database/config');

//Crear el seervidor de express
const app = express();

//Configurar CORS
app.use(cors());

//Lectura y parseo del body
app.use(express.json());

//Base de datos
dbConnection();

//middlewares
app.use(express.urlencoded({extended: false}));
const storage = multer.diskStorage({
    destination: path.join(__dirname, 'uploads'),
    filename: (req, file, cb) => {
        cb(null, new Date().getTime() + path.extname(file.originalname));
    }
});
app.use(multer({storage}).single('image'));


//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/propiedades', require('./routes/propiedades'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/ubicaciones', require('./routes/ubicaciones'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/contacto', require('./routes/contacto'));



app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en puerto ' + process.env.PORT);
});