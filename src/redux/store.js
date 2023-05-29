import { configureStore } from "@reduxjs/toolkit";
import workshop from "./workshop/slice.js"
import main from "./main/slice.js"
import storehouse from "./storehouse/slice.js"
import clients from "./clients/slice.js"
import services from "./services/slice.js"
import masters from "./masters/slice.js"
import vehicles from "./vehicles/slice.js"
import spares from "./spares/slice.js"
import acts from "./acts/slice.js"
import auth from "./auth/slice.js"

const store = configureStore({
    reducer:{
        main,
        workshop,
        storehouse,
        services,
        clients,
        masters,
        vehicles,
        spares,
        acts,
        auth    
    }
})

export default store