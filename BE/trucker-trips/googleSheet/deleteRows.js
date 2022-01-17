const doc = require('./index');

const deleteRows = async (googleSheetID, sheetTitle, data) => { //data: {rowList: ["uniqueids"], key: uniqueCOlumne name} 

    const document = await doc(googleSheetID);

    const sheets = document.sheetsByIndex;

    let response = {
        error: 'Something Went Wrong!!'
    }

    await Promise.all(sheets.map(async (sheet) => {
        if(sheet.title?.toLowerCase() === sheetTitle.toLowerCase()){
            const rowList = data?.rowList || [];
            const key = data?.key;
            if(key && rowList.length > 0){
                const rows = await sheet.getRows();
                rows.forEach(async (row) => {
                    rowList.forEach(async (r) => {
                        if(row[key] === r){
                            const data = await row.delete();
                            response = {
                                data, status: 'success'
                            }
                        }
                    })
                })
            }else
                response = {error: 'Invalid Payload!!'}
        }
    }))

    return response
}

module.exports = deleteRows;