import { useContext } from "react";
import { useSelector } from "react-redux";
import { Navigate, Route, Routes } from "react-router-dom";
import { AppContext } from "./Contexts";

import Login from "../content/Auth/Login";
import Main from "../content/Main";
import Workshops from "../content/Workshops";
import Storehouse from "../content/Storehouse";
import Spares from "../content/Storehouse/Spares";
import Services from "../content/Services";
import Clients from "../content/Clients";
import Masters from "../content/Masters";
import Vehicles from "../content/Vehicles";
import Acts from "../content/Acts";
import ActsEditor from "../content/Acts/Editor";

export default function UserRouter() {
    const { defTitle } = useContext( AppContext );
    const isAuth = useSelector((state)=> state.auth).isAuth;

    function getTitle(title) { return `${defTitle} | ${title}`; }

    return (
        <Routes>
            <Route path="/auth" element={ <Login title={getTitle("Авторизация")} subtitle="Авторизация" /> }/>

            <Route path="/" element={ isAuth ? <Main title={getTitle("Главная")} subtitle="Главная" /> : <Navigate to='/auth' /> } />

            <Route path="/workshop" element={ isAuth ? <Workshops title={getTitle("Мастерские")} subtitle="Мастерские" /> : <Navigate to='/auth' /> }/>
            <Route path="/storehouse" element={ isAuth ? <Storehouse title={getTitle("Склады")} subtitle="Склады" /> : <Navigate to='/auth' /> }/>
            <Route path="/storehouse/spares/:d" element={ isAuth ? <Spares title={getTitle("Запчасти")} subtitle="Запчасти" /> : <Navigate to='/auth' /> }/>
            <Route path="/services" element={ isAuth ? <Services title={getTitle("Услуги")} subtitle="Услуги" /> : <Navigate to='/auth' /> }/>
            <Route path="/clients" element={ isAuth ? <Clients title={getTitle("Клиенты")} subtitle="Клиенты" /> : <Navigate to='/auth' /> }/>
            <Route path="/masters" element={ isAuth ? <Masters title={getTitle("Исполнители")} subtitle="Исполнители" /> : <Navigate to='/auth' /> }/>
            <Route path="/vehicles" element={ isAuth ? <Vehicles title={getTitle("Транспортные средства")} subtitle="Транспортные средства"/> : <Navigate to='/auth' /> }/>
            <Route path="/acts" element={ isAuth ? <Acts title={getTitle("Акты")} subtitle="Акты" /> : <Navigate to='/auth' /> }/>
            <Route path="/acts/:d" element={ isAuth ? <ActsEditor title={getTitle("Акт")} subtitle="Акт" /> : <Navigate to='/auth' /> }/>

            <Route path="*" element={<Navigate to='/' />}></Route>
        </Routes>
    );
}