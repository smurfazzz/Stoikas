const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

const mdPath = path.join(__dirname, 'content', 'galerija.md');
const outputPath = path.join(__dirname, 'assets', 'gallery.json');

const fileContent = fs.readFileSync(mdPath, 'utf8');
const frontMatter = fileContent.split('---')[1];
const data = yaml.load(frontMatter);

fs.writeFileSync(outputPath, JSON.stringify(data.nuotraukos, null, 2));

console.log('Gallery JSON successfully generated.');
