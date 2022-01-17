const doc = require('./index');

const getRowCount = async (googleSheetID, sheetTitle) => { 

    const document = await doc(googleSheetID);

    const sheets = document.sheetsByIndex;

    let response = {
        error: 'Something Went Wrong!!'
    }

    await Promise.all(sheets.map(async (sheet) => {
        if(sheet.title?.toLowerCase() === "misc"){
            const rows = await sheet.getRows();
            const count = rows[0]?.[sheetTitle];
            if(count !== undefined)
                response = {
                    count: Number(count), status: 'success'
                }
        }
    }));

    return response;
}

module.exports = getRowCount;