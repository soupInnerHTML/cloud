import firebase from "firebase/app";
import "firebase/database"
import "firebase/auth"
import "firebase/storage"
import auth from "../mobx/auth";

class Firebase {
    auth = firebase.auth

    db(path = "") {
        return firebase.database().ref(`${auth.uid}/${path}`)
    }
    storage(file = "") {
        return firebase.storage().ref(`${auth.uid}/${file}`)
    }
    config = {
        apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
        databaseURL: process.env.REACT_APP_DB_URL,
        projectId: "cloud-soho",
        storageBucket: "gs://cloud-soho.appspot.com",
        authDomain: "cloud-soho.firebaseapp.com",
    }
    init() {
        firebase.initializeApp(this.config)
    }
}
export default new Firebase()
