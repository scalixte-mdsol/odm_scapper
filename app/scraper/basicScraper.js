const puppeteer = require('puppeteer');
const loginImedidata = require('./loginImedidata');
const { checkContent } = require('./isIgnorable');

// TODO - Next Iterate it with multi pages in parallel
exports.odmListScraper = async odmList => {}

exports.odmSingleScraper = async odmUuid => {
  let result;
  const resolution = {
    x : 1920,
    y : 1080,
  };
  const args = [
  '--disable-gpu',
  // `--window-size=${ resolution.x },${ resolution.y }`,
  '--no-sandbox',
  ];
  const options = {
    args,
    headless     : true,
    handleSIGINT : false
  };
  process.setMaxListeners(Infinity);
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();
  try {
    await loginImedidata.accessImedidata(page);
    result = await odmScraper(page, odmUuid);
  } finally {
    await page.close();
    await browser.close();
  }
  return result;
}

const odmScraper = async (page, odmUuid) => {
  const url = `https://epro.imedidata.com/support_home/${odmUuid}`;
  await page.goto(url, { waitUntil: ['load', 'networkidle2'], timeout: 0});

  const scraper = await queryContent(page);
  const ignorable = checkContent(scraper);
  return (ignorable && !Object.is(ignorable, {})) ? Object.assign({}, ignorable, {url}) : null ;
};

const queryContent = async page => {
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
