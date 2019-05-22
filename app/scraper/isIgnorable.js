const { odmStudies, odmSubjects, odmForms } = require('./ignorables');

exports.check = (findings) => {
  const { forms } = odmForms;
  const { subjects } = odmSubjects;
  const { study, subjectID, formOID } = findings;

  const filters = [
    odmStudies['Studies'].includes(study),
    forms[study] && forms[study].includes(formOID),
    subjects[study] && subjects[study].includes(subjectID)
  ];
  return filters.some(x => x === true) ? null : findings;
}
