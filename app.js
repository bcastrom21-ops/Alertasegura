// Integración Frontend - Backend (Consumo de API REST CRUD)
const API_URL = 'http://localhost:3000/api/reportes';

function cambiarVista(vista) {
    document.getElementById('vistaVecino').classList.toggle('hidden', vista !== 'vecino');
    document.getElementById('vistaAdmin').classList.toggle('hidden', vista !== 'admin');
    document.getElementById('tabVecino').classList.toggle('active', vista === 'vecino');
    document.getElementById('tabAdmin').classList.toggle('active', vista === 'admin');
    cargarReportes();
}

// [READ] Cargar reportes en ambos paneles
async function cargarReportes() {
    const filtro = document.getElementById('buscador').value;
    const url = filtro ? `${API_URL}?filtro=${encodeURIComponent(filtro)}` : API_URL;

    try {
        const res = await fetch(url);
        const reportes = await res.json();

        const tbodyVecino = document.getElementById('tablaVecino');
        const tbodyAdmin = document.getElementById('tablaAdmin');
        tbodyVecino.innerHTML = '';
        tbodyAdmin.innerHTML = '';

        reportes.forEach(rep => {
            if (rep.estado !== 'oculto') {
                tbodyVecino.innerHTML += `
                    <tr>
                        <td>#${rep.id_reporte}</td>
                        <td><strong>${rep.categoria}</strong></td>
                        <td>${rep.descripcion}</td>
                        <td>${rep.sector_ubicacion}</td>
                        <td><span class="badge badge-${rep.estado}">${rep.estado}</span></td>
                    </tr>
                `;
            }

            tbodyAdmin.innerHTML += `
                <tr>
                    <td>#${rep.id_reporte}</td>
                    <td><strong>${rep.categoria}</strong></td>
                    <td>${rep.descripcion}</td>
                    <td>${rep.sector_ubicacion}</td>
                    <td><span class="badge badge-${rep.estado}">${rep.estado}</span></td>
                    <td>
                        <button class="action-btn btn-revisar" onclick="actualizarEstado(${rep.id_reporte}, 'revisado')">Verificar</button>
                        <button class="action-btn btn-ocultar" onclick="actualizarEstado(${rep.id_reporte}, 'oculto')">Ocultar</button>
                        <button class="action-btn btn-eliminar" onclick="eliminarReporte(${rep.id_reporte})">Eliminar</button>
                    </td>
                </tr>
            `;
        });
    } catch (err) {
        console.error("Error al conectar con el backend:", err);
    }
}

// [CREATE] Enviar formulario (ejecuta validación de Regla de Negocio en backend)
document.getElementById('formReporte').addEventListener('submit', async (e) => {
    e.preventDefault();
    const payload = {
        id_usuario: document.getElementById('id_usuario').value,
        categoria: document.getElementById('categoria').value,
        descripcion: document.getElementById('descripcion').value,
        sector_ubicacion: document.getElementById('sector').value
    };

    const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    const data = await res.json();
    if (res.ok) {
        alert(data.message);
        document.getElementById('formReporte').reset();
        cargarReportes();
    } else {
        alert(data.error);
    }
});

// [UPDATE] Cambiar estado
async function actualizarEstado(id, nuevoEstado) {
    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estado: nuevoEstado })
    });
    cargarReportes();
}

// [DELETE] Eliminar reporte
async function eliminarReporte(id) {
    if (!confirm(`¿Seguro que deseas eliminar el reporte #${id}?`)) return;
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    cargarReportes();
}

cargarReportes();
