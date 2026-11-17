// Conexión a la Base de Datos MySQL
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'alertasegura_db'
});

db.connect(err => {
    if (err) {
        console.error("Error conectando a MySQL:", err.message);
        return;
    }
    console.log("Conectado exitosamente a MySQL (alertasegura_db)");
});

module.exports = db;
