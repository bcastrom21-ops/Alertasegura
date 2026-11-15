
const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./config/database');
const reportesRoutes = require('./routes/reportes');
const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/reportes', reportesRoutes);

app.get('/', (req, res) => {
    res.json({
        mensaje: 'Servidor de AlertaSegura funcionando correctamente'
    });
});

app.get('/api/prueba-db', async (req, res) => {
    try {
        const [resultado] = await db.query('SELECT 1 AS conexion');

        res.json({
            mensaje: 'Conexión con MySQL exitosa',
            resultado
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al conectar con MySQL'
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});
