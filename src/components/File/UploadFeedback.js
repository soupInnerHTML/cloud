import React from "react";
import { CircularProgress, IconButton, Zoom } from "@material-ui/core";
import CloseIcon from "@material-ui/icons/Close";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { useSnackbar } from "notistack";
import { Observer } from "mobx-react-lite";
import files from "../../mobx/files";

export const action = (id) => (key) => {
    const { closeSnackbar, } = useSnackbar();
    return <Observer>
        {() =>
            files.progress[id] > 100 &&
            <Zoom in>
                <IconButton
                    className={""}
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={() => closeSnackbar(key)}
                >
                    <CloseIcon fontSize="small"/>
                </IconButton>
            </Zoom>
        }
    </Observer>
}

export const message = (fileName, id) => {
    return <div className={"upload-feedback__body"}>
        <Observer>
            {
                () => files.progress[id] > 100 ?
                    <Zoom in>
                        <CheckCircleIcon style={{ color: "#009E5C", }}/>
                    </Zoom>
                    :
                    <CircularProgress
                        style={{ color: "#009E5C", }}
                        size={24}
                        variant="determinate"
                        value={files.progress[id]}
                    />
            }
        </Observer>
        <p>{fileName}</p>
    </div>
}
