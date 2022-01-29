const express = require('express');
const cors = require('cors');
const getGoogleSheetId = require('./firebase/readData');
const addRows = require('./googleSheet/addRows');
const updateRow = require('./googleSheet/updateRow');
const getRowCount = require('./googleSheet/getRowCount');
const getRows = require('./googleSheet/getRows');
const deleteRows = require('./googleSheet/deleteRows');
const getColumnData = require('./googleSheet/getColumnData');

const app = express();

app.use(express.json());

// enable cors
app.use(
    cors({
      origin: true,
      optionsSuccessStatus: 200,
      credentials: true,
    })
  );
  app.options(
    '*',
    cors({
      origin: true,
      optionsSuccessStatus: 200,
      credentials: true,
    })
  );

app.get('/', async (req, res) => {
    res.json({ message: "No Response available!!" });
  })

app.post('/add/:sheet', async (req, res) => {

    const headers = req.headers;
    const authorization = headers?.authorization;

    const uid = authorization?.replace('Bearer ', '');

    const sheet = req.params?.sheet;

    const body = req.body;

    const googleSheetID = await getGoogleSheetId(uid);

    let response = {
        error: "Something Went Wrong!!"
    }

    if(googleSheetID){
        response = await addRows(googleSheetID, sheet, body);
    }

    res.json(response)
})

app.get('/getColumn/:sheet/:key', async (req, res) => {

    const headers = req.headers;
    const authorization = headers?.authorization;

    const uid = authorization?.replace('Bearer ', '');

    const sheet = req.params?.sheet;
    const key = req.params?.key;

    const googleSheetID = await getGoogleSheetId(uid);

    let response = {
        error: "Something Went Wrong!!"
    }

    if(googleSheetID){
        response = await getColumnData(googleSheetID, sheet, key);
    }

    res.json(response)
})

app.post('/edit/:sheet', async (req, res) => {

    const headers = req.headers;
    const authorization = headers?.authorization;

    const uid = authorization?.replace('Bearer ', '');

    const sheet = req.params?.sheet;

    const body = req.body;

    const googleSheetID = await getGoogleSheetId(uid);

    let response = {
        error: "Something Went Wrong!!"
    }

    if(googleSheetID){
        response = await updateRow(googleSheetID, sheet, body);
    }

    res.json(response)
})

app.post('/get/:sheet', async (req, res) => {

    const headers = req.headers;
    const authorization = headers?.authorization;

    const uid = authorization?.replace('Bearer ', '');

    const sheet = req.params?.sheet;

    const body = req.body;

    const googleSheetID = await getGoogleSheetId(uid);

    let response = {
        error: "Something Went Wrong!!"
    }

    if(googleSheetID){
        response = await getRows(googleSheetID, sheet, body);
    }

    res.json(response)
})

app.post('/remove/:sheet', async (req, res) => {

    const headers = req.headers;
    const authorization = headers?.authorization;

    const uid = authorization?.replace('Bearer ', '');

    const sheet = req.params?.sheet;

    const body = req.body;

    const googleSheetID = await getGoogleSheetId(uid);

    let response = {
        error: "Something Went Wrong!!"
    }

    if(googleSheetID){
        response = await deleteRows(googleSheetID, sheet, body);
    }

    res.json(response)
})

app.get('/count/:sheet', async (req, res) => {

    const headers = req.headers;
    const authorization = headers?.authorization;

    const uid = authorization?.replace('Bearer ', '');

    const sheet = req.params?.sheet;

    const googleSheetID = await getGoogleSheetId(uid);

    let response = {
        error: "Something Went Wrong!!"
    }


    if(googleSheetID){
        response = await getRowCount(googleSheetID, sheet)
    }

    res.json(response)
})

const port = process.env.port || 3001;

app.listen(port, () => console.log(`Listening on port ${port}...`));