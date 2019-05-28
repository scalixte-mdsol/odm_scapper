const Window = require('window');
const { DOMParser } = require('xmldom');
const { odmIgnorables } = require('../scraper/odmScraperList');

exports.odmParser = async odmList => {
  // resetTable();
  if (Array.isArray(odmList) && odmList.length) {
    return results = await odmIgnorables(odmList);
  } else return [];
}

exports.updateContents = (html, odmList = []) => {
  const { document } = new Window();
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, 'text/html');
  // console.log('HTML', html);
  // console.log('DOCUMENT', doc);
  // console.log(doc.documentElement);
  // console.log('DOCUMENT BODY', document.documentElement);
  // console.log(document.body.innerHTML);
  console.log(doc.documentElement.getElementById("odmListTable"));
  // const table = document.getElementById("odmListTable");
  // table.deleteTHead();
  // const newDoc = document.implementation.createHTMLDocument("New Document");
  // const table = newDoc.createElement('table');
  // const header = table.createTHead();
  // const rowHeader = header.insertRow(0);
  // ['Study', 'link to Support', 'Error Message', 'Submission Date', 'Subject ID' ].forEach((text, index) => {
  //   let cell = rowHeader.insertCell(index);
  //   cell.innerHTML = `<b>${text}</b>`;
  // });
  // // document.body.append(table);
  // // newDoc.body.append(table);
  // newDoc.body.appendChild(table);
  // const srcNode = newDoc.contentDocument;
  // const destDocument = doc.documentElement;
  // // console.log('newDoc',newDoc);
  // // console.log('destDocument',destDocument);
  // // console.log('srcNode',srcNode);
  // const newNode = destDocument.importNode(srcNode, true);
  // destDocument.replaceChild(newNode, destDocument.documentElement);
  // // return destDocument;
  // return html;
  // return document.all;
}

exports.generateContents = (odmList) => {
  // const { document } = new Window();
  // const document = window.document;
  console.log('THIS', this);

  // document.body.innerHTML = '<div class="foo">Hi!</div>';
  // document.body.querySelector('.foo').textContent;
  // return document.body.innerHTML;

  // const table = document.getElementById("odmListTable");
  // // table.deleteTHead();
  // // const table = document.createElement('table');
  // const header = table.createTHead();
  // const rowHeader = header.insertRow(0);
  // ['Study', 'link to Support', 'Error Message', 'Submission Date', 'Subject ID' ].forEach((text, index) => {
  //   let cell = rowHeader.insertCell(index);
  //   cell.innerHTML = `<b>${text}</b>`;
  // });
  // document.body.append(table);
  // // return document.body.innerHTML;
  // console.log(document);
  // console.log(document.all);
  // console.log(document.body.innerHTML);
  // return document.body.innerHTML;
}

const resetTable = () => {
  try {
    const table = window.document.getElementById("odmListTable");
    table.deleteTHead();
    table.rows.forEach(row => table.deleteRow(0));
  } catch(err) {
    console.error(err);
  }
}

const updateTable = odmList => {
  if (Array.isArray(odmList) && odmList.length) {
    const table = window.document.getElementById("odmListTable");
    const header = table.createTHead();
    const rowHeader = header.insertRow(0);
    ['Study', 'link to Support', 'Error Message', 'Submission Date', 'Subject ID' ].forEach((text, index) => {
      let cell = rowHeader.insertCell(index);
      cell.innerHTML = `<b>${text}</b>`;
    });

    odmList.forEach((odm, index) => {
      let row = table.insertRow(index);
      odm.forEach((text, index) => {
        let cell = row.insertCell(index);
        cell.innerHTML = text;
      });
    });
  }
};

exports.generateBasicTable = (odmList = []) => {
  const { document } = new Window();
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
