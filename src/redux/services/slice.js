import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentRowId: null,
    tableHeader: [
        `Название`,
        `Норма времени час`,
        `Стоимость норма часа`,
        `Действия`
    ],
    tableRow: [
        {
            id: 0,
            element: {
                service:`Смазка карбюратора`,
                rate:0.4,
                price:1000
            },
            deleted: false,
            preDelete: false,
        },
        {
            id: 1,
            element: {
                service:`Смазка карбюратора`,
                rate:0.4,
                price:1000
            },
            deleted: false,
            preDelete: false,
        },
    ],
    inputInfo: [
        {
            id: 0,
            title: `Название`,
            text: ``,
            desc: `Название услуги, будет указываться в актах`,
        },
        {
            id: 1,
            title: `Норма времени час`,
            text: ``,
            desc: `Затраты рабочего времени, будет указываться в актах`,
        },
        {
            id: 2,
            title: `Стоимость норма часа`,
            text: ``,
            desc: `Стоимость труда, будет указываться в актах`,
        },
    ],
    isActive: false,
    editMode: false,
};

const servicesSlice = createSlice({
    name: `services`,
    initialState,
    reducers: {
        deleteRowById(state, action) {
            state.tableRow[action.payload].deleted = true;
            state.tableRow[action.payload].preDelete =
                !state.tableRow[action.payload].preDelete;
        },
        returnRowById(state, action) {
            state.tableRow[action.payload].deleted = false;
        },
        togglePreDeleteById(state, action) {
            state.tableRow[action.payload].preDelete =
                !state.tableRow[action.payload].preDelete;
        },
        setServiceInputValueById(state, action) {
            state.inputInfo[action.payload.id].text = action.payload.text;
        },
        addNewWorkShop(state, action) {
            state.isActive = false
            const newWorkShop = {
                id: state.tableRow.length,
                element: {
                    service: state.inputInfo[0].text,
                    rate: state.inputInfo[1].text,
                    price: state.inputInfo[2].text
                },
                deleted: false,
                preDelete: false,
            };
            state.tableRow.push(newWorkShop);
            state.inputInfo.forEach((e) => {
                e.text = ``;
            });
        },
        toggleServicesIsActive(state, action) {
            state.editMode = false;
            state.inputInfo.forEach((e) => {
                e.text = ``;
            });
            state.isActive = !state.isActive;
        },
        changeServiceTableRowById(state, action) {
            state.isActive = false
            state.editMode = false;
            
            let i = 0;
            for(let e in state.tableRow[action.payload].element){
                state.tableRow[action.payload].element[e] = state.inputInfo[i].text
                i++  
            }
            state.currentRowId = null;

            state.inputInfo.forEach((e) => {
                e.text = ``;
            });
            
        },
        turnServiceEditModeById(state, action) {
            state.isActive = !state.isActive
            state.currentRowId = action.payload;
            for(let i = 0; i <= 2; i++){
                state.inputInfo[i].text  = Object.values(state.tableRow[action.payload].element)[i];
            }
            state.editMode = true;
        },
        killPanel(state, action) {
            state.editMode = false;
            state.isActive = false;
            state.currentRowId = null;
        },
    },
});

export const {
    killPanel,
    deleteRowById,
    returnRowById,
    togglePreDeleteById,
    setServiceInputValueById,
    addNewWorkShop,
    changeServiceTableRowById,
    turnServiceEditModeById,
    toggleServicesIsActive,
} = servicesSlice.actions;
export default servicesSlice.reducer;
