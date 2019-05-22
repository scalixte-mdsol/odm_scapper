const puppeteer = require('puppeteer');
const isIgnorable = require('./isIgnorable');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage()
  await page.goto('https://epro.imedidata.com/support_home/201a160e-fc3e-4c5e-9eb1-0c76b8646e69')

	const result = await page.evaluate(() => {
 	  let date = document.querySelector('#odm-header #odm-details tbody tr:nth-type-of(1) td:nth-type-of(1)').innerText;
   	let study = document.querySelector('#odm-header #odm-details tbody tr:nth-type-of(1) td:nth-type-of(2)').innerText;
   	let subjectID = document.querySelector('#odm-header #odm-details tbody tr:nth-type-of(1) td:nth-type-of(3)').innerText;
   	let errorMessage = document.querySelector('#odm-header #odm-details tbody tr:nth-type-of(1) td:nth-type-of(1)').innerText;
    return {
      date,
	    study,
      subjectID,
      errorMessage
	  }
  })

  console.log('isIgnorable(result)');

  browser.close()
})()
