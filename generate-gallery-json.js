const fs = require('fs');
const yaml = require('js-yaml');

const yamlContent = fs.readFileSync('content/galerija.md', 'utf8');

// Ištraukiam YAML frontmatter iš .md failo
const frontMatter = yamlContent.split('---')[1];
const data = yaml.load(frontMatter);

const output = {
  nuotraukos: data.nuotraukos
};

// Išsaugom JSON į content/ katalogą
fs.writeFileSync('content/gallery_data.json', JSON.stringify(output, null, 2));
console.log("✅ gallery_data.json generated successfully");
