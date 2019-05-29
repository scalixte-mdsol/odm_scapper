exports.accessImedidata = async page => {
  const imedidataPage = 'https://www.imedidata.com';
  const loginImedidataPage = 'https://login.imedidata.com/login';

  // Verify login status
  await page.goto(imedidataPage);

  const iMedidataUrl = page.url();
  if (iMedidataUrl.includes(imedidataPage)) {
    await page.screenshot({ path: 'imedidata.png' });
  } else {
    // Login to iMedidata
    await page.goto(loginImedidataPage);
    await page.type('#session_username', process.env.IMEDIDATA_USER_NAME);
    await page.type('#session_password', process.env.IMEDIDATA_PASSWORD);
    await page.click('#create_session_link');
  }
};
