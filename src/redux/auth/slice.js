import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import login from "../../content/Auth/Login";

const initialState = {
    user: {
        login: null,
        password: null,
        isAdmin: false
    },
    isAuth: true,
};

const authSlice = createSlice({
    name: `auth`,
    initialState,
    reducers: {
        loginUser(state, action){
            console.log(
                action.payload.login,
                action.payload.password
            );

            console.log(state.isAuth);
        }
    },
});

export const {
loginUser
} = authSlice.actions;
export default authSlice.reducer;
