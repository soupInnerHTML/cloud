import { makeAutoObservable } from "mobx";
import firebase from "../firebase"
import { action, message } from "../components/File/UploadFeedback";
import { v4 as uuidv4 } from "uuid";
import UI from "./UI";

class Files {
    data = []
    progress = {}
    cachedLength = localStorage.getItem("filesLength")

    async observeStorageData() {
        const ref = await firebase.db()
        ref.on("value", snapshot => {
            const data = snapshot.val()
            if (data) {
                const arr = Object.values(data)
                const keys = Object.keys(data)

                this.cachedLength = arr.length
                localStorage.setItem("filesLength", arr.length.toString())

                const parsedData = arr.map((file, index) => ({
                    ...file,
                    id: keys[index],
                }))
                this.data = parsedData
                // console.log(parsedData)
            }
            else {
                this.data = []

                this.cachedLength = 0
                localStorage.setItem("filesLength", "0")
            }
        })
    }

    async deleteFile(name, id) {
        const desertRef = firebase.storage(name);
        await desertRef.delete()
        await firebase.db(id).remove()
        UI.enqueueSnackbar(<p>{name + " deleted"}</p>, {
            variant: "success",
            persist: true,
        })
    }

    uploadFiles = async (e) => {
        const { files, } = e.target;
        for (const file of [...files]) {
            if (file) {
                const id = uuidv4()
                const ref = firebase.storage(file.name)
                const uploadTask = ref.put(file, {
                    contentType: file.type,
                })

                UI.enqueueSnackbar(
                    message(file.name, id),
                    {
                        action: action(id),
                        persist: true,
                    }
                )

                // enqueueSnackbar(file.name)

                // Register three observers:
                // 1. 'state_changed' observer, called any time the state changes
                // 2. Error observer, called on failure
                // 3. Completion observer, called on successful completion
                uploadTask.on("state_changed",
                    (snapshot) => {
                        // Observe state change events such as progress, pause, and resume
                        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                        this.progress[id] = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        console.log("Upload is " + this.progress[id] + "% done");

                        // switch (snapshot.state) {
                        //     case firebase.storage.TaskState?.PAUSED: // or 'paused'
                        //         console.log("Upload is paused");
                        //         break;
                        //     case firebase.storage.TaskState?.RUNNING: // or 'running'
                        //         console.log("Upload is running");
                        //         break;
                        // }
                    },
                    (error) => {
                        // Handle unsuccessful uploads
                        console.log(error)
                    },
                    () => {
                        // Handle successful uploads on complete
                        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadURL) => {
                            console.log("File available at", downloadURL);
                        });
                        this.progress[id] = 101
                    }
                );

                const snapshot = await uploadTask
                const fileURL = await snapshot.ref.getDownloadURL()
                const indexOfFileName = this.data.map(file => file.fileName).indexOf(file.name)
                const uploadedFile = { fileURL, fileName: file.name, date: +new Date(), }

                if (indexOfFileName + 1) {
                    await firebase.db(this.data[indexOfFileName].id).update(uploadedFile)
                }
                else {
                    await firebase.db().push().set(uploadedFile)
                }
            }
        }
    }

    constructor() {
        makeAutoObservable(this)
    }

}

export default new Files()
