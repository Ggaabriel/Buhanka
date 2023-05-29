import {useContext, useEffect, useState} from "react";
import { AppContext } from "../../../app/Contexts";
import {loginUser} from "../../../redux/auth/slice";
import {useDispatch} from "react-redux";

const Auth = ({ title, subtitle }) => {
    const { setTitle } = useContext(AppContext);
    const dispatch = useDispatch();
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => setTitle(title), []);

    return (
        <main className="main j-center a-center">
            <div className="content flex col g32">
                <h1>{ subtitle }</h1>

                <form className="flex col a-center g16"
                      onSubmit={
                          (event) => {
                              event.preventDefault();
                              dispatch( loginUser({login:login, password:password}) )
                          }
                      }>
                    <label htmlFor="login">
                        <input id="login"
                               type="text"
                               autoComplete="login"
                               defaultValue={login}
                               onChange={ (event)=>setLogin(event.target.value) } />
                    </label>

                    <label htmlFor="password">
                        <input id="password"
                               type="password"
                               autoComplete="password"
                               defaultValue={password}
                               onChange={ (event)=>setPassword(event.target.value) } />
                    </label>

                    <label htmlFor="submit">
                        <input type="submit" id="submit" value="Войти"/>
                    </label>
                </form>
            </div>
        </main>
    );
};

export default Auth;
