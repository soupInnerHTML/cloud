import React, { useEffect, useRef, useState } from "react";
import files from "../mobx/files";
import { observer } from "mobx-react-lite";
import File from "../components/File/File";
import auth from "../mobx/auth";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Fab, Tooltip, Zoom, Container, Button, Backdrop } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const Dashboard = () => {

    const uploadFilesInput = useRef(null);
    const [isFileWillDrop, setIsFileWillDrop] = useState(false);

    const onDropFiles = e => {
        e.preventDefault()
        setIsFileWillDrop(false)
        const pseudoEvent = { target: { files: e.dataTransfer.files, }, }
        files
            .uploadFiles(pseudoEvent)
            .then()
    }

    // const onDragOver = e => {
    //     e.preventDefault()
    //     setIsFileWillDrop(true)
    // }

    useEffect(() => {
        files.observeStorageData().then()

        const unsubscribe = document.onmouseleave = () => setIsFileWillDrop(false)
        return unsubscribe
    }, []);

    const dropActions = {
        onDragOver: e => {
            e.preventDefault()
            setIsFileWillDrop(true)
        },
        onDrop: onDropFiles,
        onBlur: () => setIsFileWillDrop(false),
    };

    return (
        <>
            <Container
                className={"dashboard__container"}
                {...dropActions}
            >
                <input
                    ref={uploadFilesInput}
                    onChange={files.uploadFiles}
                    type={"file"}
                    multiple
                    hidden
                />

                <div className={"dashboard__file-list"}>
                    {files.data.length ? files.data.map(file => (
                        <File key={file.id} {...file}/>
                    )) : Array.from({ length: files.cachedLength || 15, }, (_, index) => (
                        <Zoom in key={index}>
                            <Skeleton className={"file__container"} variant="rect" height={200} animation="wave" />
                        </Zoom>
                    ))}
                </div>

                <div className={"dashboard__exit"}>
                    <Tooltip title="Exit" arrow>
                        <Button>
                            <ExitToAppIcon onClick={auth.exit}>Выход</ExitToAppIcon>
                        </Button>
                    </Tooltip>
                </div>
            </Container>
            <div className={"fab__uploadFiles"}>
                <Zoom in={!isFileWillDrop}>
                    <Fab color="secondary" onClick={() => uploadFilesInput.current?.click()}>
                        <CloudUploadIcon />
                    </Fab>
                </Zoom>
            </div>

            <Backdrop
                open={isFileWillDrop}
                style={{ zIndex: 1, }}
                {...dropActions}
            >
                <CloudUploadIcon className={"backdrop__icon"} />
            </Backdrop>
        </>
    );
};

export default observer(Dashboard);
