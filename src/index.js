import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firebase from "./firebase"
import { SnackbarProvider } from "notistack";
import "./index.css";

firebase.init()

ReactDOM.render(
    <React.StrictMode>
        <SnackbarProvider anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
        }}>
            <App />
        </SnackbarProvider>
    </React.StrictMode>,
    document.getElementById("root")
);
