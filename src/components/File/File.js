import React, { useState } from "react";
import ContextMenu from "./ContextMenu"
import InsertDriveFileIcon from "@material-ui/icons/InsertDriveFile";
import Zoom from "@material-ui/core/Zoom";

const File = ({ fileURL, fileName, id, }) => {

    const [anchorEl, setAnchorEl] = useState(null);
    const [contextPosition, setContextPosition] = useState({ top: 0, left: 0, })

    const handleContext = (event) => {
        event.preventDefault()
        setContextPosition({ top: event.pageY, left: event.pageX, })
        // console.log({ top: event.pageY, left: event.pageX, })
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        console.log("__handleClose__")
    };

    return (
        <Zoom in>
            <div
                className={"file__container"}
                onContextMenu={handleContext}
            // onClick={setIsSelected}
            >
                <div className={"file__icon--wrapper"}>
                    <InsertDriveFileIcon className={"file__icon"} color={"primary"}/>
                </div>

                <div className={"file__label--wrapper"}>
                    <p className={"file__label"} href={fileURL}>
                        {fileName}
                    </p>
                </div>

                <ContextMenu
                    fileURL={fileURL}
                    fileName={fileName}
                    fileId={id}
                    contextPosition={contextPosition}
                    anchorEl={anchorEl}
                    handleClose={handleClose}
                />
            </div>
        </Zoom>
    );
};

export default File;
