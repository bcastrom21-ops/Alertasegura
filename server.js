const express = require('express');
const cors = require('cors');
const reportesRoutes = require('./routes/reportesRoutes');

const app = express();
app.use(express.json());
app.use(cors());

app.use('/api/reportes', reportesRoutes);

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor AlertaSegura corriendo en http://localhost:${PORT}`);
});
