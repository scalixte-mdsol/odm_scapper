var express = require('express');
const app = express();
app.use(express.urlencoded());
const { join } = require('path');
const router = express.Router();

const { odmParser } = require(join(__dirname, 'app/ui/lib'));

router.get('/',function(req,res){
  res.sendFile(join(`${__dirname}/index.html`));
});

// router.post('/', function(req, res){
//   console.log('request', req.body);
//   // res.sendFile(join(`${__dirname}/index.html`));
//   // res.end();
//   res.redirect('/');
// });
router.post('/odmList', function(req, res){
  const odmRegex = /([a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12})+[^(?:\s*|\s*,)|\r\n]?/g
  const { odmList } = req.body;
  // const result = await odmParser(odmList.match(odmRegex));
  // await console.log(result);
  // console.log('request', req.body);
  // console.log(new RegExp(odmRegex).exec(odmList));
  // console.log(odmRegex.exec(odmList));
  // console.log(odmList.match(odmRegex));
  // res.sendFile(join(`${__dirname}/index.html`));
  // res.end();
  // odmParser(odmList.match(odmRegex)).then(data => )
  Promise.resolve()
  .then(async () => await odmParser(odmList.match(odmRegex)))
  .then(async (result) => {
    await console.log('RESULT', result)
  })
  .then(() => res.redirect('/'))

  // res.redirect('/');
});


app.use('/', router);
app.use('/odmList', router);
app.use('/css',express.static(join(__dirname, 'app/ui')));
app.use('/lib',express.static(join(__dirname, 'app/ui')));
app.use('/odm',express.static(join(__dirname, 'app/scraper')));
app.listen(process.env.ODM_PORT || 3000);
