const { odmIgnorables } = require('../scraper/odmScraperList');
exports.odmParser = async odmList => {
  // resetTable();
  if (Array.isArray(odmList) && odmList.length) {
    return results = await odmIgnorables(odmList);
  } else return [];
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
