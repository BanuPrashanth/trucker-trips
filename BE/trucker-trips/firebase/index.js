const firebase = require("firebase-admin");
const { getFirestore } = require('firebase-admin/firestore');

const credentials = require("./trucker-trips-config.json");

firebase.initializeApp({
    credential: firebase.credential.cert(credentials),
    //databaseURL: "https://<yourproject>.firebaseio.com",
  });

  const db = getFirestore();
  
  
  module.exports = db;
