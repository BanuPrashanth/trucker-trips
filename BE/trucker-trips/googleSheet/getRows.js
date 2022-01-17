const doc = require('./index');

const getRows = async (googleSheetID, sheetTitle, fields) => { 

    const document = await doc(googleSheetID);

    const sheets = document.sheetsByIndex;

    let response = {
        error: 'Something Went Wrong!!'
    }

    await Promise.all(sheets.map(async (sheet) => {
        let rowCount;
        if(sheet.title?.toLowerCase() === "misc"){
            const rows = await sheet.getRows();
            const key = `${sheetTitle.toLowerCase()}_count`;
            const count = rows[0]?.[key];
            rowCount = Number(count);
        } 
        if(sheet.title?.toLowerCase() === sheetTitle.toLowerCase()){
            const data = await sheet.getRows({limit: rowCount});
            const convertedData = data.map((d) => {
                const rowData = {};
                fields.forEach((field) => {
                    rowData[field] = d[field]
                })
                return rowData;
            })
            if(data)
                response = {
                    data: convertedData, status: 'success'
                }
        }
    }))

    return response;
}

module.exports = getRows;