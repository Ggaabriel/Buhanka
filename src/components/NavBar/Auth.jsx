import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/auth/slice";

const Auth = () => {
    const dispatch = useDispatch();
    const [login, setLogin] = useState(``);
    const [password, setPassword] = useState(``);
    return (
        <div>
            <h3>Логин</h3>
            <input type="text" value={login} onChange={(e)=>setLogin(e.target.value)}/>
            <h3>Пароль</h3>
            <input type="text" value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button 
            
            onClick={()=>{
                dispatch(loginUser({login:login, password:password}))
            }}
            >Авторизоваться</button>
        </div>
    );
};

export default Auth;
