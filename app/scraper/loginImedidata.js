exports.accessImedidata = async page => {
  const imedidataPage = 'https://www.imedidata.com';
  const loginImedidataPage = 'https://login.imedidata.com/login';

  // Verify login status
  await page.goto(imedidataPage);
  // await page.waitForNavigation();

  const iMedidataUrl = page.url();
  if (iMedidataUrl.includes(imedidataPage)) {
    await page.screenshot({ path: 'imedidata.png' });
  } else {
    // Login to iMedidata
    await page.goto(loginImedidataPage);
    //   console.log('process.env.IMEDIDATA_USER_NAME', process.env.IMEDIDATA_USER_NAME);
    await page.type('#session_username', process.env.IMEDIDATA_USER_NAME);
    await page.type('#session_password', process.env.IMEDIDATA_PASSWORD);
    await page.click('#create_session_link');
    //   await page.waitForNavigation();
    await page.screenshot({ path: 'imedidata.png' });
  }
  console.log(iMedidataUrl);
  console.log('process.env.IMEDIDATA_USER_NAME', process.env.IMEDIDATA_USER_NAME);
};
