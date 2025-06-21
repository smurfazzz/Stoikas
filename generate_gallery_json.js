const fs = require('fs');
const yaml = require('js-yaml');

const mdFile = './content/galerija.md';
const outputFile = './assets/gallery.json';

function parseFrontMatter(content) {
  const parts = content.split('---');
  if (parts.length < 3) {
    throw new Error("No valid front matter found");
  }
  return yaml.load(parts[1]);
}

const mdContent = fs.readFileSync(mdFile, 'utf8');
const data = parseFrontMatter(mdContent);

fs.writeFileSync(outputFile, JSON.stringify(data.nuotraukos, null, 2));
console.log('gallery.json successfully generated!');
