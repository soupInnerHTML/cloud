import React, { useEffect, useRef } from "react";
import files from "../mobx/files";
import { observer } from "mobx-react-lite";
import File from "../components/File/File";
import auth from "../mobx/auth";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import { Fab, Tooltip, Zoom, Container, Button } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

const Dashboard = () => {

    const uploadFilesInput = useRef(null)

    const onDropFiles = e => {
        e.preventDefault()
        const pseudoEvent = { target: { files: e.dataTransfer.files, }, }
        files
            .uploadFiles(pseudoEvent)
            .then()
    }

    useEffect(() => {
        files.observeStorageData().then()
    }, [])

    return (
        <>
            <Container
                className={"dashboard__container"}
                onDragOver={e => e.preventDefault()}
                onDrop={onDropFiles}
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
                    )) : Array.from({ length: files.cachedLength || 15, }, () => (
                        <Skeleton className={"file__container"} variant="rect" height={200} animation="wave" />
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
                <Zoom in>
                    <Fab color="secondary" onClick={() => uploadFilesInput.current?.click()}>
                        <CloudUploadIcon />
                    </Fab>
                </Zoom>
            </div>
        </>
    );
};

export default observer(Dashboard);
