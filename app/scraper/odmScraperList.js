const puppeteer = require('puppeteer');
const loginImedidata = require('./loginImedidata');
const isIgnorable = require('./isIgnorable');

exports.odmIgnorables = async (odms = []) => {
  let odmResult = [];
  try {
    const browser = await puppeteer.launch();

    const page = await browser.newPage();
    await loginImedidata.accessImedidata(page);

    odmResult = odms.map(async odmUuid => {
      const supportLink = `https://epro.imedidata.com/support_home/${odmUuid}`;
      await page.goto(supportLink);

      const result = await page.evaluate(() => {
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
      let ignorable = {};
      ignorable[odmUuid] = isIgnorable.check(Object.assign({}, ...result, supportLink));
      return ignorable;
    });
    browser.close();
  } catch (err) {
    odmResult = [];
    console.error(err);
  }
  return odmResult;
};
