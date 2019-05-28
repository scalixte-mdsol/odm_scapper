const puppeteer = require('puppeteer');
const loginImedidata = require('./loginImedidata');
const isIgnorable = require('./isIgnorable');

// exports.odmIgnorables = async (odmList) => {
//   let results = [];
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   try {
//     await loginImedidata.accessImedidata(page);
//     // odmList.forEach(async (odmUuid, index) => {
//       // const url = `https://epro.imedidata.com/support_home/${odmUuid}`;
//       // results[index] = await singleItemScraper(page, url);
//       // results[index] = await Promise.resolve(singleItemScraper(page, url));
//       // results[index] = await new Promise(resolve => setTimeout(() => resolve(singleItemScraper(page, url)), 0));
//     // });
//     // const promises = await mapResults(page, odmList);
//     // result = await Promise.all(mapResults(page, odmList));
//     // result = await Promise.all(async () => []);
//     return new Promise((resolve, reject) => {
//       let results = [];
//       odmList.forEach(async (odmUuid, index) => {
//         const url = `https://epro.imedidata.com/support_home/${odmUuid}`;
//         // results[index] = await singleItemScraper(page, url);
//         // results[index] = await Promise.resolve(singleItemScraper(page, url));
//         results[index] = await new Promise(resolve => setTimeout(() => resolve(singleItemScraper(page, url)), 0));
//
//       });
//       return Promise.all(results);
//     })
//   } catch(err){
//     console.error(err);
//     results = [];
//   } finally {
//     await page.close();
//     await browser.close();
//   }
//   return [];
// };

exports.odmIgnorables = async (odmList) => {
  let result = [];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await loginImedidata.accessImedidata(page);
    return await Promise.all(odmList.map(async odmUuid => {
      // const url = `https://epro.imedidata.com/support_home/${odmUuid}`;
      // const scrap = await singleItemScraper(page, url);
      // // const scrap = await setTimeout(() => singleItemScraper(page, url), 100);
      // // const scrap = await new Promise(resolve => setTimeout(() => resolve(singleItemScraper(page, url)), 0));
      // // const scrap = await new Promise(async resolve => await setTimeout(async () => await resolve(singleItemScraper(page, url)), 0));
      // // const scrap = await new Promise(resolve => setTimeout(() => resolve(singleItemScraper(page, url)), 0));
      // await page.screenshot({ path: `screenshot_${odmUuid}.png` });
      // const ignorable = isIgnorable.checkContent(scrap);
      // let odmResult = {};
      // odmResult[odmUuid] = Object.assign({}, ignorable, {url});
      // return Promise.resolve(odmResult);
      ((odmUuid) => console.log(odmUuid))(odmUuid);
      return await (async (odmUuid) => {

        const url = `https://epro.imedidata.com/support_home/${odmUuid}`;
        const scrap = await singleItemScraper(page, url);
        const ignorable = isIgnorable.checkContent(scrap);
        let odmResult = {};
        odmResult[odmUuid] = Object.is(ignorable, {}) ? null : Object.assign({}, ignorable, {url});
        return Promise.resolve(odmResult);
      })(odmUuid);
    }));
  } catch(err) {
    console.error(err);
    result = [];
  } finally {
    await page.close();
    await browser.close();
  }
  return result;
}
//
// const singleItemScraper = async (page, url) => {
//   console.log('URL', url);
//   // const promise = page.waitForNavigation({ 'waitUntil':['load', 'networkidle2'] });
//   // await page.goto(url);
//   // await promise;
//   // await page.goto(url, {'waitUntil':['load', 'networkidle2']});
//   // await page.goto(url, { waitUntil: 'networkidle2'});
//   await page.goto(url, { waitUntil: ['load', 'networkidle2']});
//   console.log('PAGE URL', page.url())
//   return await page.evaluate(() => {
//     let date = document.querySelector('#odm-header #odm-details tbody tr:nth-child(1) td:nth-child(1)').innerText;
//     let study = document.querySelector('#odm-header #odm-details tbody tr:nth-child(1) td:nth-child(2)').innerText;
//     let subjectID = document.querySelector('#odm-header #odm-details tbody tr:nth-child(1) td:nth-child(3)').innerText;
//     let errorMessage = document.querySelector('#odm-header #odm-details tbody tr:nth-child(2) td:nth-child(1) p').innerText;
//     let formOID = document.querySelector('#odm-edit #odm-edit-form div.well input[name="edits[][new_value]"]:nth-of-type(19)').value;
//     return {
//       date,
//       study,
//       subjectID,
//       errorMessage,
//       formOID
//     };
//   });
// }

const singleItemScraper = async (page, url) => {
  return ( async (page, url) => {
    console.log('URL', url);
    // const promise = page.waitForNavigation({ 'waitUntil':['load', 'networkidle2'] });
    // await page.goto(url);
    // await promise;
    // await page.goto(url, {'waitUntil':['load', 'networkidle2']});
    // await page.goto(url, { waitUntil: 'networkidle2'});
    await page.goto(url, { waitUntil: ['load', 'networkidle2']});
    console.log('PAGE URL', page.url())
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
  })(page, url);
}
