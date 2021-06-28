import { makeAutoObservable } from "mobx";
import firebase from "../firebase"

class Auth {
    uid = localStorage.getItem("uid")
    isLoggedIn = !!this.uid

    googleSignIn = async () => {
        let provider = new firebase.auth.GoogleAuthProvider()
        const data = await firebase.auth().signInWithPopup(provider)
        const { displayName, photoURL, uid, email, providerData, } = data.user

        localStorage.setItem("uid", uid)
        this.uid = uid
        this.isLoggedIn = true

        console.log({
            displayName, photoURL, uid, email,
            from: providerData[0].providerId,
        })
    }

    signIn = async ({ email, password, }) => {
        const { user, } = await firebase.auth().signInWithEmailAndPassword(email, password)

        localStorage.setItem("uid", user.uid)
        this.uid = user.uid
        this.isLoggedIn = true
    }

    signUp = async ({ email, password, }) => {
        const { user, } = await firebase.auth().createUserWithEmailAndPassword(email, password)

        localStorage.setItem("uid", user.uid)
        this.uid = user.uid
        this.isLoggedIn = true
    }

    exit = () => {
        this.uid = null
        this.isLoggedIn = false
        localStorage.removeItem("uid")
    }

    constructor() {
        makeAutoObservable(this)
    }

}

export default new Auth()
