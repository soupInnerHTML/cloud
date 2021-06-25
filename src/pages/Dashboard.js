import React, { useEffect } from "react";
import firebase from "../firebase"
import files from "../mobx/files";
import { observer } from "mobx-react-lite";
import File from "../components/File";
import auth from "../mobx/auth";

const Dashboard = () => {
    let loadFile = async e => {
        let file = e.target.files[0]
        if (file) {
            let ref = firebase.storage(file.name)
            let snapshot = await ref.put(file,  {
                contentType: file.type,
            })
        }
    }
    useEffect(() => {
        files.getStorageData()
    }, [])
    return (
        <div className={"dashboard__file-list"}>
            <input onChange={ loadFile } type={"file"}/>
            <div className={"dashboard__file-list"}>
                {files.data.map(file => (
                    <File key={file.fullPath} name={file.name}/>
                ))}
            </div>

            <div className={"dashboard__exit"}>
                <a href="#" onClick={auth.exit}>Выход</a>
            </div>
        </div>
    );
};

export default observer(Dashboard);
