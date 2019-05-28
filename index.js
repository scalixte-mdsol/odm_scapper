const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.urlencoded());
const { join } = require('path');
const router = express.Router();

const { odmSingleScraper, odmListScraper} = require(join(__dirname, 'app/scraper/basicScraper'));

const { odmParser, generateContents, updateContents, generateBasicTable } = require(join(__dirname, 'app/ui/lib'));
const { parseRegexList } = require(join(__dirname, 'app/utils/parseRegex.js'));

router.get('/',function(req,res){
  res.sendFile(join(`${__dirname}/index.html`));
});

// router.post('/', function(req, res){
//   console.log('request', req.body);
//   // res.sendFile(join(`${__dirname}/index.html`));
//   // res.end();
//   res.redirect('/');
// });
// router.post('/odmList', function(req, res){
//   const odmRegex = /([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})+[^(?:\s*|\s*,)|\r\n]?/g
//   const { odmList } = req.body;
//   // const result = await odmParser(odmList.match(odmRegex));
//   // await console.log(result);
//   // console.log('request', req.body);
//   // console.log(new RegExp(odmRegex).exec(odmList));
//   // console.log(odmRegex.exec(odmList));
//   // console.log(odmList.match(odmRegex));
//   // res.sendFile(join(`${__dirname}/index.html`));
//   // res.end();
//   // odmParser(odmList.match(odmRegex)).then(data => )
//   Promise.resolve()
//   .then(async () => await odmParser(odmList.match(odmRegex)))
//   .then(async (result) => {
//     await console.log('RESULT', result)
//   })
//   .then(() => res.redirect('/'))
//
//   // res.redirect('/');
// });

// router.post('/odmList', function(req, res) {
//   const { odmList } = req.body;
//   const list = parseRegexList(odmList);
//   console.log(list);
//   // generateContents(list);
//   // app.engine('html', require('ejs').renderFile);
//   // app.engine('html', () => ());
//   // app.set('view engine', 'html');
//   // app.set('views', __dirname);
//   // res.render(generateContents(list));
//   // res.sendFile(join(`${__dirname}/app/ui/odmList.html`), generateContents(list));
//   // generateContents(list);
//   // res.end(generateContents(list));
//   // res.redirect('/');
//   // updateContents
//   fs.readFile(join(`${__dirname}/app/ui/odmList.html`), 'utf-8', (err, html) => {
//     // console.log('error', err || undefined);
//     // console.log('html', html || undefined);
//     res.end(updateContents(html, list));
//   })
// });

router.post('/odmList', async function(req, res) {
  const { odmList } = req.body;
  const list = parseRegexList(odmList);
  const finalList = await Promise.all(list.map(uuid => {
    return odmSingleScraper(uuid);
  }));
  console.log('---------------------------------------------');
  res.end(generateBasicTable(finalList.filter(list => list)));
});


app.use('/', router);
app.use('/odmList', router);
app.use('/css',express.static(join(__dirname, 'app/ui')));
app.use('/lib',express.static(join(__dirname, 'app/ui')));
app.use('/odm',express.static(join(__dirname, 'app/scraper')));
app.listen(process.env.ODM_PORT || 3000);
