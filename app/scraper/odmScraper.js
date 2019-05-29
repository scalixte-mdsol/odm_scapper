const puppeteer = require('puppeteer');
const loginImedidata = require('./loginImedidata');
const { checkContent } = require('./isIgnorable');

(async () => {
  const browser = await puppeteer.launch();

  const page = await browser.newPage();
  await loginImedidata.accessImedidata(page);


  await page.goto('https://epro.imedidata.com/support_home/9cc6517f-3f5b-4e2b-9a4e-51b5c6f49b17');
  // await page.goto('https://epro.imedidata.com/support_home/4676b1e4-fbbc-4750-9b40-0a25a2900203');

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

  console.log(checkContent(result));
  await page.screenshot({ path: 'screenshot.png' });
  console.log('CLOSING')
  browser.close();
})();
