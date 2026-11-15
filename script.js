
"use strict";

// CONFIGURACIÓN DEL BACKEND
const API_URL = "http://localhost:3000/api/reportes";

// ELEMENTOS DEL DOCUMENTO
const navigation = document.getElementById("navigation");
const menuToggle = document.getElementById("menuToggle");
const reportForm = document.getElementById("reportForm");
const reportList = document.getElementById("reportList");

// NAVEGACIÓN ENTRE INTERFACES
function showPage(pageId) {
  const selectedPage = document.getElementById(pageId);

  if (!selectedPage) return;

  document.querySelectorAll(".page").forEach(page => {
    page.classList.remove("active");
  });

  selectedPage.classList.add("active");

  document.querySelectorAll(".nav-link").forEach(button => {
    button.classList.toggle(
      "active",
      button.dataset.page === pageId
    );
  });

  navigation.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");

  if (pageId === "reportes") {
    renderReports();
  }

  window.scrollTo({ top: 0, behavior: "smooth" });
}

// ACTIVAR NAVEGACIÓN
document.querySelectorAll("[data-page]").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    showPage(button.dataset.page);
  });
});

// MENÚ MÓVIL
menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// CONSULTAR REPORTES DESDE MYSQL
async function renderReports() {
  const search = document.getElementById("searchInput")
    .value.trim().toLowerCase();

  const category = document.getElementById("categoryFilter").value;

  const count = document.getElementById("reportCount");
  const emptyMessage = document.getElementById("emptyMessage");

  reportList.innerHTML = "<p>Consultando reportes...</p>";
  count.textContent = "";

  try {
    const response = await fetch(API_URL);

    if (!response.ok) {
      throw new Error("No se pudieron consultar los reportes.");
    }

    const reports = await response.json();

    const filteredReports = reports.filter(report => {
      const text = (
        report.titulo + " " +
        report.sector + " " +
        report.descripcion
      ).toLowerCase();

      const matchesSearch = text.includes(search);
      const matchesCategory =
        !category || report.categoria === category;

      return matchesSearch && matchesCategory;
    });

    reportList.innerHTML = "";

    count.textContent =
      filteredReports.length + " reportes encontrados";

    emptyMessage.classList.toggle(
      "hidden",
      filteredReports.length > 0
    );

    filteredReports.forEach(report => {
      const card = document.createElement("article");
      card.className = "report-card";

      const categoryLabel = document.createElement("span");
      categoryLabel.className = "report-category";
      categoryLabel.textContent = report.categoria;

      const title = document.createElement("h3");
      title.textContent = report.titulo;

      const description = document.createElement("p");
      description.textContent = report.descripcion;

      const sector = document.createElement("p");
      sector.textContent = "Sector: " + report.sector;

      const cuadrante = document.createElement("p");
      cuadrante.textContent = "Cuadrante: " + report.cuadrante;

      const estado = document.createElement("p");
      estado.textContent = "Estado: " + report.estado;

      const date = document.createElement("span");
      date.className = "report-date";

      date.textContent = "Fecha: " +
        new Date(report.fecha_creacion).toLocaleString("es-CO");

      card.append(
        categoryLabel,
        title,
        description,
        sector,
        cuadrante,
        estado,
        date
      );

      reportList.appendChild(card);
    });

  } catch (error) {
    console.error(error);

    reportList.innerHTML = "";
    count.textContent = "";

    emptyMessage.classList.remove("hidden");
    emptyMessage.textContent =
      "No se pudieron cargar los reportes. Verifica que el servidor esté funcionando.";
  }
}

// BUSCADOR Y FILTROS
document.getElementById("searchInput")
  .addEventListener("input", renderReports);

document.getElementById("categoryFilter")
  .addEventListener("change", renderReports);

// REGISTRAR REPORTE EN MYSQL
reportForm.addEventListener("submit", async event => {
  event.preventDefault();

  const titulo = document.getElementById("title").value.trim();
  const categoria = document.getElementById("category").value;
  const sector_id = Number(document.getElementById("sector").value);
  const descripcion = document.getElementById("description").value.trim();

  const message = document.getElementById("formMessage");
  const submitButton = reportForm.querySelector(
    'button[type="submit"]'
  );

  message.textContent = "";
  message.className = "form-message";

  if (!titulo || !categoria || !descripcion || !sector_id) {
    message.textContent = "Por favor, completa todos los campos.";
    message.classList.add("error");
    return;
  }

  if (titulo.length < 5 || descripcion.length < 10) {
    message.textContent =
      "El título debe tener 5 caracteres y la descripción 10 como mínimo.";
    message.classList.add("error");
    return;
  }

  submitButton.disabled = true;

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        titulo,
        categoria,
        descripcion,
        sector_id
      })
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.mensaje || "No se pudo registrar el reporte.");
    }

    reportForm.reset();

    message.textContent = "¡Reporte registrado correctamente en la base de datos!";
    message.classList.add("success");

    await renderReports();

    setTimeout(() => {
      showPage("reportes");
    }, 1000);

  } catch (error) {
    console.error(error);

    message.textContent =
      error.message || "Error al conectar con el servidor.";

    message.classList.add("error");

  } finally {
    submitButton.disabled = false;
  }
});

// CARGAR REPORTES AL INICIAR
renderReports();
