const Window = require('window');

const cssContent = `
table {
    border: solid 1px #DDEEEE;
    border-collapse: collapse;
    border-spacing: 0;
    font: normal 14px Arial, sans-serif;
}
table thead td {
    background-color: #DDEFEF;
    border: solid 1px #DDEEEE;
    color: #336B6B;
    padding: 10px;
    text-align: left;
    text-shadow: 1px 1px 1px #fff;
}
table tbody td {
    border: solid 1px #DDEEEE;
    color: #333;
    padding: 10px;
    text-shadow: 1px 1px 1px #fff;
}
`;

exports.generateBasicTable = (odmList = []) => {
  const { document } = new Window();


  const style = document.createElement('style');
  const type = document.createAttribute('type');
  type.value = 'text/css';
  style.setAttributeNode(type);
  style.innerHTML = cssContent;
  const table = document.createElement('table');
  const tbody = document.createElement('tbody');
  const header = table.createTHead();
  const rowHeader = header.insertRow(0);
  ['Study', 'link to Support', 'Error Message', 'Submission Date', 'Subject ID', 'Form OID' ].forEach((text, index) => {
    let cell = rowHeader.insertCell(index);
    cell.innerHTML = `<b>${text}</b>`;
  });

  odmList.forEach( (odm, rowIndex) => {
    const { study, date, subjectID, errorMessage, url, formOID } = odm;
    let row = tbody.insertRow(rowIndex);
    [study, url, errorMessage, date, subjectID, formOID].forEach((text, cellIndex) => {
      let cell = row.insertCell(cellIndex);
      cell.innerHTML = text;
    });
  });

  table.append(tbody);

  document.body.prepend(style);
  document.body.append(table);
  return document.body.innerHTML;
}
