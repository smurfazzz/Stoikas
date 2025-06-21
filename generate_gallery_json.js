const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

// Galerijos md failų aplankas
const folder = './content/galerija';

// Galutinis JSON failas
const output = './assets/data/gallery.json';

const items = [];

fs.readdirSync(folder).forEach(file => {
  const content = fs.readFileSync(path.join(folder, file), 'utf8');
  const data = matter(content).data;

  items.push({
    img: data.img,
    title: data.title,
    caption: data.caption
  });
});

// Išrikiuojam nuo naujausios
items.sort((a, b) => (a.title < b.title) ? 1 : -1);

fs.mkdirSync(path.dirname(output), { recursive: true });
fs.writeFileSync(output, JSON.stringify(items, null, 2));

console.log('✅ Gallery JSON sugeneruotas!');
