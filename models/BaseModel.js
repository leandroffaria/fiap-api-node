const firebase = require('firebase');
const firebaseConfig = require('../config/firebase');

const firebaseApp = firebase.initializeApp(firebaseConfig);

class BaseModel {
    constructor() {
        this.db = firebaseApp.firestore();
    }
}

module.exports = BaseModel;