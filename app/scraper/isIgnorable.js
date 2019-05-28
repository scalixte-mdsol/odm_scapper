const { odmStudies, odmSubjects, odmForms, odmErrors } = require('./ignorables');

exports.checkContent = findings => {
  const { forms } = odmForms;
  const { subjects } = odmSubjects;
  const { errors } = odmErrors;
  const { study, subjectID, formOID, errorMessage } = findings;

  const filters = [
    odmStudies['Studies'].includes(study),
    forms[study] && forms[study].includes(formOID),
    subjects[study] && subjects[study].includes(subjectID),
    errors[study] && errors[study].includes(errorMessage)
  ];
  return filters.some(x => x === true) ? null : findings;
};
