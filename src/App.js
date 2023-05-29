import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AppContext } from "./app/Contexts.jsx";
import "./App.css"
import NavBar from "./components/NavBar";
import UserRouter from "./app/UserRouter";

function App() {
    const defTitle = "Buhanka";
    const location = useLocation();
    const isAuth = useSelector((state)=> state.auth).isAuth;
    const hasNav = location.pathname !== "/auth" || !isAuth;

    const [ title, setTitle ] = useState(defTitle);

    useEffect(() => { document.title = title; }, [title]);

    return (
        <AppContext.Provider value={{ location, defTitle, title, setTitle }}>
            <div className="App p32 --mob-p16">
                <div className={ hasNav ? "content grid col-app j-center g32" : "content flex a-center j-center" }>
                    { hasNav && <NavBar /> }
                    <UserRouter />
                </div>
            </div>
        </AppContext.Provider>
    );
}

export default App;
