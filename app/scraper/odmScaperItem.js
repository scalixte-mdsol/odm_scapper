const isIgnorable = require('./isIgnorable');
exports.scrapeOdm = async (browser, supportLink) => {
  await page.goto(supportLink);
  return await page.evaluate(() => {
    let date = document.querySelector('#odm-header #odm-details tbody tr:nth-child(1) td:nth-child(1)').innerText;
    let study = document.querySelector('#odm-header #odm-details tbody tr:nth-child(1) td:nth-child(2)').innerText;
    let subjectID = document.querySelector('#odm-header #odm-details tbody tr:nth-child(1) td:nth-child(3)').innerText;
    let errorMessage = document.querySelector('#odm-header #odm-details tbody tr:nth-child(2) td:nth-child(1) p').innerText;
    let formOID = document.querySelector('#odm-edit #odm-edit-form div.well input[name="edits[][new_value]"]:nth-of-type(19)').value;
    return {
      date,
      study,
      subjectID,
      errorMessage,
      formOID
    };
  });
};
