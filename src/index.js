import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import firebase from "./firebase"
import { SnackbarProvider } from "notistack";
import "./index.css";

firebase.init()

ReactDOM.render(
    <SnackbarProvider anchorOrigin={{
        vertical: "bottom",
        horizontal: "right",
    }}>
        <App />
    </SnackbarProvider>
    ,
    document.getElementById("root")
);
