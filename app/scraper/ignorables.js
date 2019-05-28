const yaml = require('js-yaml');
const fs = require('fs');

const loadContent = filename => {
  let result;
  try {
    result = yaml.safeLoad(fs.readFileSync(filename, 'utf8'));
  } catch (e) {
    result = {};
  }
  return result;
};

exports.odmStudies = loadContent('app/scraper/odmStudies.yml');
exports.odmSubjects = loadContent('app/scraper/odmSubjects.yml');
exports.odmForms = loadContent('app/scraper/odmForms.yml');
exports.odmErrors = loadContent('app/scraper/odmErrors.yml');
