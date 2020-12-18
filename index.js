/** CONTROLADOR **/
// Imports
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const router = require('./Routes/routing');

var corsOptions = {
    origin: "http://localhost:4200"
};

// Iniciación del web server
const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use('/', router); // Su ruta inicial será la raíz

const db = require('./Model/heroes.model');
db.mongoose.connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado a la base de datos');
}).catch(err => {
    console.log('No se pudo establecer conexión con la base de datos');
    process.exit();
});

app.get("/",(req,res) => {
    res.json({ message: "Inicio a servidor de aplicación" });
});

app.listen( port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
});