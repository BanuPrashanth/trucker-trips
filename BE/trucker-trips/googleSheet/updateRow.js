const doc = require('./index');

const updateRow = async (googleSheetID, sheetTitle, data) => { //data: {activeRow: "uniqueids", key: uniqueCOlumne name, updatedRow: {}} 

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
            const activeRow = data?.activeRow;
            const key = data?.key;
            const updatedRow = data?.updatedRow;
            if(key){
                const rows = await sheet.getRows({limit: rowCount});
                await Promise.all(rows.map(async (row) => {
                    if(row[key] === activeRow){
                        const keys = Object.keys(updatedRow);
                        keys.forEach((k) => {
                            row[k] = updatedRow[k];
                        })
                        const data = await row.save();
                        response = {
                            data, status: 'success'
                        }
                    }
                }))
            }else
                response = {error: 'Invalid Payload!!'}
        }
    }))

    return response;
}

module.exports = updateRow;