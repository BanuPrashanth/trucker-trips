const db = require('./index');

const getGoogleSheetId = async (uid) => {
    const doc = await db.collection('users').doc(uid).get();
    if (!doc.exists) {
        return false;
      } else {
        const data = doc.data();
        return data.google_id;
      }
}

module.exports = getGoogleSheetId;