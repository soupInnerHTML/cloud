import React from "react";
import DeleteOutlinedIcon from "@material-ui/icons/DeleteOutlined";
import TextFieldsIcon from "@material-ui/icons/TextFields";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import { Popover, ListItem, List, ListItemIcon, ListItemText } from "@material-ui/core";
import download from "downloadjs";
import files from "../../mobx/files";

export default function SimpleList({ fileName, fileId, fileURL, anchorEl, handleClose, contextPosition, }) {
    const id = Boolean(anchorEl) ? "simple-popover" : undefined;

    function downloadFile(e) {
        e.preventDefault()
        download(fileURL, fileName)
    }

    return (
        <Popover
            id={id}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            anchorEl={anchorEl}
            anchorReference="anchorPosition"
            anchorPosition={contextPosition}
            anchorOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
            transformOrigin={{
                vertical: "top",
                horizontal: "left",
            }}
        >
            <List component="nav" aria-label="main mailbox folders">
                <ListItem button onClick={downloadFile}>
                    <ListItemIcon>
                        <CloudDownloadIcon />
                    </ListItemIcon>
                    <ListItemText primary="Download" />
                </ListItem>
                <ListItem button onClick={() => files.deleteFile(fileName, fileId)}>
                    <ListItemIcon>
                        <DeleteOutlinedIcon />
                    </ListItemIcon>
                    <ListItemText primary="Delete" />
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <TextFieldsIcon />
                    </ListItemIcon>
                    <ListItemText primary="Rename" />
                </ListItem>
            </List>
        </Popover>
    );
}
