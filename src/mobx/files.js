import { makeAutoObservable } from "mobx";
import firebase from "../firebase"

class Files {
    data = []
    async getStorageData() {
        const data = await firebase.storage().listAll()
        this.data = data.items
        console.log(data.items)
    }

    constructor() {
        makeAutoObservable(this)
    }

}

export default new Files()
