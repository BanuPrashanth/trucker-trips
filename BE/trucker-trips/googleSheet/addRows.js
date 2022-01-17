const doc = require('./index');

const addRows = async (googleSheetID, sheetTitle, payload) => { //data: { headerName: rowData, headerName: rowData }

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
            let isDuplicate = false;
            const rows = await sheet.getRows({limit: rowCount});
            await Promise.all(rows.map(async (row) => {
                const data = payload?.data;
                const key = payload?.key;
                const tableData = row?.[key]?.toLowerCase()?.replace(' ', '');
                const payloadData = data?.[key]?.toLowerCase()?.replace(' ', '');
                if(tableData === payloadData){
                    isDuplicate = true;
                }
            }))
            if(payload?.data && !isDuplicate){
                const res = await sheet.addRow(payload?.data);
                if(res)
                    response = {
                        data: payload.data, status: 'success'
                    }
            }
            else
                response = {
                    error: 'Vehicle Number already exists'
                };
        }
    }))
    
    return response;
}

module.exports = addRows;