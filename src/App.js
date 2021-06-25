import "./App.css";
import Auth from "./pages/Auth";
import { observer } from "mobx-react-lite";
import auth from "./mobx/auth";
import Dashboard from "./pages/Dashboard";

function App() {
    return (
        auth.isLoggedIn ? <Dashboard/> : <Auth/>
    );
}

export default observer(App);
