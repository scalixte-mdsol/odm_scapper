const puppeteer = require('puppeteer');
const loginImedidata = require('./loginImedidata');
const isIgnorable = require('./isIgnorable');


exports.odmIgnorables = async (odmList) => {
  let result = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    // let page = await browser.newPage();
    await loginImedidata.accessImedidata(page);
    // await page.close();
    result = await Promise.all(odmList.map(async odmUuid => {
      // page = await browser.newPage();
      const url = `https://epro.imedidata.com/support_home/${odmUuid}`;
      const scrap = await singleItemScraper(page, url);
      // const scrap = await setTimeout(() => singleItemScraper(page, url), 100);
      // await page.close();
      await page.screenshot({ path: `screenshot_${odmUuid}.png` });
      const ignorable = isIgnorable.check(scrap);
      let odmResult = {};
      odmResult[odmUuid] = Object.assign({}, ignorable, {url});
      return Promise.resolve(odmResult);
    }));
  } catch(err) {
    console.error(err);
    result = [];
  } finally {
    await browser.close();
  }
  return result;
}

const singleItemScraper = async (page, url) => {
  console.log('URL', url);
  // const promise = page.waitForNavigation({ 'waitUntil':['load', 'networkidle2'] });
  // await page.goto(url);
  // await promise;
  // await page.goto(url, {'waitUntil':['load', 'networkidle2']});
  await page.goto(url, { waitUntil: 'networkidle2'});
  // page.reload();
  console.log('PAGE URL', page.url())
  return await page.evaluate(() => {
    // window.location.href = url;
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
}
