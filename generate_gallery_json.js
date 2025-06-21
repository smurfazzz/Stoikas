const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

// Nuskaitom galerija.md
const mdPath = path.join(__dirname, 'content', 'galerija.md');
const fileContent = fs.readFileSync(mdPath, 'utf8');

// Ištraukiam YAML dalį
const frontMatter = fileContent.split('---')[1];
const data = yaml.load(frontMatter);

// Sukuriam assets katalogą jei nėra
const outputDir = path.join(__dirname, 'assets');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir);
}

// Sukuriam JSON failą
const outputPath = path.join(outputDir, 'gallery.json');
fs.writeFileSync(outputPath, JSON.stringify(data.nuotraukos, null, 2));

console.log('✅ gallery.json sėkmingai sugeneruotas!');
