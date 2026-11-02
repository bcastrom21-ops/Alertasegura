"use strict";


// ALER TASEGURA BAYUNCA
// Funciones de navegación, búsqueda y registro de reportes.


// Reportes iniciales de ejemplo.
let reports = [
  {
    title: "Luminaria dañada",
    category: "Alumbrado público",
    sector: "Sector de ejemplo A",
    description: "Ejemplo ficticio de un reporte sobre alumbrado público.",
    date: "02/11/2026"
  },
  {
    title: "Situación para revisión comunitaria",
    category: "Actividad sospechosa",
    sector: "Sector de ejemplo B",
    description: "Registro ficticio utilizado para probar la consulta de reportes.",
    date: "02/11/2026"
  }
];


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


// ACTIVAR BOTONES DE NAVEGACIÓN
document.querySelectorAll("[data-page]").forEach(button => {
  button.addEventListener("click", event => {
    event.preventDefault();
    showPage(button.dataset.page);
  });
});


// MENÚ PARA DISPOSITIVOS MÓVILES
menuToggle.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");


  menuToggle.setAttribute("aria-expanded", String(isOpen));
});


// MOSTRAR REPORTES
function renderReports() {
  const search = document
    .getElementById("searchInput")
    .value.trim()
    .toLowerCase();


  const category = document.getElementById("categoryFilter").value;


  const filteredReports = reports.filter(report => {
    const text = (
      report.title + " " +
      report.sector + " " +
      report.description
    ).toLowerCase();


    const matchesSearch = text.includes(search);
    const matchesCategory = !category || report.category === category;


    return matchesSearch && matchesCategory;
  });


  reportList.innerHTML = "";


  document.getElementById("reportCount").textContent =
    filteredReports.length + " reportes encontrados";


  document.getElementById("emptyMessage")
    .classList.toggle("hidden", filteredReports.length > 0);


  filteredReports.forEach(report => {
    const card = document.createElement("article");
    card.className = "report-card";


    const categoryLabel = document.createElement("span");
    categoryLabel.className = "report-category";
    categoryLabel.textContent = report.category;


    const title = document.createElement("h3");
    title.textContent = report.title;


    const description = document.createElement("p");
    description.textContent = report.description;


    const sector = document.createElement("p");
    sector.textContent = "Ubicación: " + report.sector;


    const date = document.createElement("span");
    date.className = "report-date";
    date.textContent = "Fecha: " + report.date;


    card.append(categoryLabel, title, description, sector, date);
    reportList.appendChild(card);
  });
}


// BUSCADOR Y FILTRO
document.getElementById("searchInput")
  .addEventListener("input", renderReports);


document.getElementById("categoryFilter")
  .addEventListener("change", renderReports);


// REGISTRO DE NUEVOS REPORTES
reportForm.addEventListener("submit", event => {
  event.preventDefault();


  const title = document.getElementById("title").value.trim();
  const category = document.getElementById("category").value;
  const sector = document.getElementById("sector").value.trim();
  const description = document.getElementById("description").value.trim();


  const message = document.getElementById("formMessage");


  message.textContent = "";
  message.className = "form-message";


  if (!title || !category || !sector || !description) {
    message.textContent = "Por favor, completa todos los campos.";
    message.classList.add("error");
    return;
  }


  if (title.length < 5 || description.length < 10) {
    message.textContent =
      "El título debe tener 5 caracteres y la descripción 10 como mínimo.";
    message.classList.add("error");
    return;
  }


  const newReport = {
    title: title,
    category: category,
    sector: sector,
    description: description,
    date: new Date().toLocaleDateString("es-CO")
  };


  reports.unshift(newReport);


  reportForm.reset();


  message.textContent = "¡Reporte registrado correctamente!";
  message.classList.add("success");


  renderReports();


  setTimeout(() => {
    showPage("reportes");
  }, 1000);
});


// CARGAR REPORTES AL INICIAR
renderReports();