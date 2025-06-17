import CMS from "https://unpkg.com/decap-cms@^2.10.0/dist/decap-cms.js";

CMS.registerPreviewStyle("/assets/css/style.css");

function renderTable(rows) {
  const headers = [
    "Treniruočių laikas",
    "Pirmadienis",
    "Antradienis",
    "Trečiadienis",
    "Ketvirtadienis",
    "Penktadienis"
  ];

  return `
    <table class="table table-bordered text-center">
      <thead class="table-light">
        <tr>${headers.map(h => `<th>${h}</th>`).join("")}</tr>
      </thead>
      <tbody>
        ${rows.map(row => `
          <tr>${row.map(cell => `<td>${cell || ""}</td>`).join("")}</tr>
        `).join("")}
      </tbody>
    </table>
  `;
}

const TreniruočiųGrafikaiPreview = ({ entry }) => {
  const data = entry.get("data").toJS();

  const kaunasLentele = (data.kaunas_lentele || []).map(row => (row.cells || []).map(c => c.cell));
  const kedainiaiLentele = (data.kedainiai_lentele || []).map(row => (row.cells || []).map(c => c.cell));

  const container = document.createElement("div");
  container.className = "container py-5";
  container.innerHTML = `
    <h1 class="display-4 text-center mb-5">${data.puslapio_pavadinimas || ""}</h1>

    <h2 class="mb-3">Treniruočių grafikas Kaune 2024/25 m. sezonas</h2>
    <div class="table-responsive">${renderTable(kaunasLentele)}</div>

    <hr class="my-5">

    <h2 class="mb-3">Treniruočių grafikas Kėdainiuose 2024/25 m. sezonas</h2>
    <div class="table-responsive">${renderTable(kedainiaiLentele)}</div>
  `;

  return container;
};

CMS.registerPreviewTemplate("grafikai", TreniruočiųGrafikaiPreview);
