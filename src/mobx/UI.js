import { makeAutoObservable } from "mobx";

class UI {
    enqueueSnackbar = () => {}

    constructor() {
        makeAutoObservable(this)
    }

}

export default new UI()
