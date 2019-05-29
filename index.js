const express = require('express');
const app = express();
app.use(express.urlencoded());
const { join } = require('path');
const router = express.Router();

const { odmSingleScraper, odmListScraper} = require(join(__dirname, 'app/scraper/basicScraper'));

const { generateBasicTable } = require(join(__dirname, 'app/ui/lib'));
const { parseRegexList } = require(join(__dirname, 'app/utils/parseRegex.js'));

router.get('/',function(req,res){
  res.sendFile(join(`${__dirname}/index.html`));
});

router.post('/odmList', async function(req, res) {
  const { odmList } = req.body;
  const list = parseRegexList(odmList);
  const finalList = await Promise.all(list.map(uuid => {
    return odmSingleScraper(uuid);
  }));
  // To indicate it's done
  console.log('---------------------------------------------');
  res.end(generateBasicTable(finalList.filter(list => list)));
});


app.use('/', router);
app.use('/odmList', router);
app.use('/css',express.static(join(__dirname, 'app/ui')));
app.use('/lib',express.static(join(__dirname, 'app/ui')));
app.use('/odm',express.static(join(__dirname, 'app/scraper')));
app.listen(process.env.ODM_PORT || 3000);
