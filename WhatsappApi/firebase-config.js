const firebase = require('firebase')
require('firebase/auth')
require('firebase/database')


var firebaseConfig = {
	apiKey: "AIzaSyA_1suKb78W9_aHO60yPJO_yZKmSGUN9UA",
    authDomain: "demonewfirebase-e5bdf.firebaseapp.com",
    databaseURL: "https://demonewfirebase-e5bdf-default-rtdb.firebaseio.com",
    projectId: "demonewfirebase-e5bdf",
    storageBucket: "demonewfirebase-e5bdf.appspot.com",
    messagingSenderId: "587475167827",
    appId: "1:587475167827:web:48af2dfc448d3f2f4a74a6",
    measurementId: "G-Y7X7XC2TDF"
};


firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()
db.settings({ timestampsInSnapshots: true })

module.exports = db;