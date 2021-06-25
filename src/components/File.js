import React, { useEffect, useState } from "react";
import firebase from "../firebase";

const File = ({ name, }) => {
    const [href, setHref] = useState("#")

    useEffect(() => {
        firebase.storage(name).getDownloadURL().then((url) => {
            setHref(url)
        })
    })

    function downloadFile(e) {
        e.preventDefault()
        let xhr = new XMLHttpRequest();
        xhr.responseType = "blob";
        xhr.onload = (event) => {
            let blob = xhr.response;
        };
        xhr.open("GET", href);
        xhr.send();
    }

    return (
        <div>
            <a
                onContextMenu={e => e.preventDefault()}
                onClick={downloadFile}
                {...{ href, }}
            >{name}</a>
        </div>
    );
};

export default File;
