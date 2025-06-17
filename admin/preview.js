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

  let html = '<table class="table table-bordered text-center">';
  html += '<thead class="table-light"><tr>' + headers.map(h => `<th>${h}</th>`).join("") + '</tr></thead>';
  html += '<tbody>';

  rows.forEach(row => {
    html += '<tr>' + row.map(cell => `<td>${cell || ""}</td>`).join("") + '</tr>';
  });

  html += '</tbody></table>';
  return html;
}

const TreniruočiųGrafikaiPreview = ({ entry }) => {
  const data = entry.get("data").toJS();

  const kaunasLentele = (data.kaunas_lentele || []).map(row => row.cells?.map(c => c.cell) || []);
  const kedainiaiLentele = (data.kedainiai_lentele || []).map(row => row.cells?.map(c => c.cell) || []);

  return `
    <main class="container py-5">
      <h1 class="display-4 text-center mb-5">${data.puslapio_pavadinimas || ""}</h1>

      <h2 class="mb-3">Treniruočių grafikas Kaune 2024/25 m. sezonas</h2>
      <p>${data.kaunas_intro || ""}</p>
      <div class="table-responsive">${renderTable(kaunasLentele)}</div>
      <p>${data.kaunas_footer || ""}</p>
      <p>${data.kaunas_extra || ""}</p>

      <hr class="my-5">

      <h2 class="mb-3">Treniruočių grafikas Kėdainiuose 2024/25 m. sezonas</h2>
      <p>${data.kedainiai_intro || ""}</p>
      <div class="table-responsive">${renderTable(kedainiaiLentele)}</div>
      <p>${data.kedainiai_extra || ""}</p>
    </main>
  `;
};

CMS.registerPreviewTemplate("grafikai", TreniruočiųGrafikaiPreview);
