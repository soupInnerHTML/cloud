import "./App.css";
import Auth from "./pages/Auth";
import { observer } from "mobx-react-lite";
import auth from "./mobx/auth";
import Dashboard from "./pages/Dashboard";
import { useEffect } from "react";
import { useSnackbar } from "notistack";
import UI from "./mobx/UI";
import { runInAction } from "mobx";

function App() {
    const { enqueueSnackbar, } = useSnackbar();

    useEffect(() => {
        document.oncontextmenu = e => e.preventDefault()
        runInAction(() => UI.enqueueSnackbar = enqueueSnackbar)
    }, [])

    return (
        auth.isLoggedIn ? <Dashboard/> : <Auth/>
    );
}

export default observer(App);
