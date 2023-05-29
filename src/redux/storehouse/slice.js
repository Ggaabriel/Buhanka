import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    haveSpares: true,
    currentRowId: null,
    tableHeader: [
        `Название`,
        `Адрес`,
        `Действия`,
    ],
    tableRow: [
        {
            id: 0,
            element: {
                title: `Хороший склад`,
                address: `Ул. Такая ст. 56`,
            },
            deleted: false,
            preDelete: false,
        },
        {
            id: 1,
            element: {
                title: `Склад им.Тутэнхамона`,
                address: `Ул. Такая ст. 57`,
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
            desc: `Название для Вашего удобства в идентификации склада`,
        },
        {
            id: 1,
            title: `Адрес`,
            text: ``,
            desc: `Адрес нужен для удобства в постройке плана по ремонту`,
        },
    ],
    isActive: false,
    editMode: false,
};

const storehouseSlice = createSlice({
    name: `storehouse`,
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
        setInputValueById(state, action) {
            state.inputInfo[action.payload.id].text = action.payload.text;
        },
        addNewWorkShop(state, action) {
            state.isActive = false
            const newWorkShop = {
                id: state.tableRow.length,
                element: {
                    title: state.inputInfo[0].text,
                    address: state.inputInfo[1].text,
                },
                deleted: false,
                preDelete: false,
            };
            state.tableRow.push(newWorkShop);
            state.inputInfo.forEach((e) => {
                e.text = ``;
            });
        },
        toggleIsActive(state, action) {
            state.editMode = false;
            state.inputInfo.forEach((e) => {
                e.text = ``;
            });
            state.isActive = !state.isActive;
        },
        changeTableRowById(state, action) {
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
        turnEditModeById(state, action) {
            debugger
            state.isActive = !state.isActive
            state.currentRowId = action.payload;
            for(let i = 0; i <= 1; i++){
                state.inputInfo[i].text  = Object.values(state.tableRow[action.payload].element)[i];
            }
            state.editMode = true;
        },
        killPanel(state, action) {
            state.editMode = false;
            state.inputInfo.forEach((e) => {
                e.text = ``;
            });
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
    setInputValueById,
    addNewWorkShop,
    changeTableRowById,
    turnEditModeById,
    toggleIsActive,
} = storehouseSlice.actions;
export default storehouseSlice.reducer;
