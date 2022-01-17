const { GoogleSpreadsheet } = require('google-spreadsheet');
const creds = require('./trucker-trips-key.json');

const initializeGoogleSheet = async (goole_sheet_id) => {
    // Initialize the sheet - doc ID is the long id in the sheets URL
    const doc = new GoogleSpreadsheet(goole_sheet_id);

    // Initialize Auth - see https://theoephraim.github.io/node-google-spreadsheet/#/getting-started/authentication
    await doc.useServiceAccountAuth(creds);

    await doc.loadInfo(); 

    return doc;
}

module.exports = initializeGoogleSheet;