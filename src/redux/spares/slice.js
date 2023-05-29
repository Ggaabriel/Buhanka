import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    addressRow: null,
    currentRowId:null,
    tableHeader: [
        `Название`,
        `Ед. измерения`,
        `Совмест. авто`,
        `Кол-во`,
        `Закуп. Цена`,
        `Стоимость`,
        `Действия`,
    ],
    tableRow: [
        {
            id: 0,
            storehouseId:0,
            element: {
                name: `карбюратор`,
                unit: `шт`,
                compVehicles: [
                    {name:`лада`, model: `приора`,year:`2004`},
                    {name:`Toyota`, model: `Camry`,year:`2006`},
                ],
                quantity: 1,
                buyPrice:`50`,
                price: `9000`,
            },
            deleted: false,
            preDelete: false,
            flag:false,
        },
        {
            id: 1,
            storehouseId:1,
            element: {
                name: `Выхлопная труба`,
                unit: `шт`,
                compVehicles: [
                    {name:`лада`, model: `приора`,year:`2004`},
                ],
                quantity: 999,
                buyPrice:`9.99`,
                price: `10`,
            },
            deleted: false,
            preDelete: false,
            flag:false,
        },
    ],
    inputInfo: [
        {
            id: 0,
            title: `Название`,
            text: ``,
        },
        {
            id: 1,
            title: `Единица измерения`,
            text: ``,
        },
        {
            id: 2,
            title: `Совместимые авто`,
            text: ``,
        },
        {
            id: 3,
            title: `Количество`,
            text: ``,
        },
        {
            id: 4,
            title: `Закупочная цена`,
            text: ``,
        },
        {
            id: 5,
            title: `Стоимость`,
            text: ``,
        },
        {
            id: 6,
            title: `Марка`,
            text: ``,
        },
        {
            id: 7,
            title: `Модель`,
            text: ``,
        },
        {
            id: 8,
            title: `Год`,
            text: ``,
        },

    ],
    isActive: false,
    editMode: false,
};

const sparesSlice = createSlice({
    name: `spares`,
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
                storehouseId: action.payload,
                element: {
                    name: state.inputInfo[0].text,
                    unit: state.inputInfo[1].text,
                    compVehicles: [
                    ],
                    quantity: state.inputInfo[3].text,
                    buyPrice: state.inputInfo[4].text,
                    price: state.inputInfo[5].text,
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
            state.currentRowId = null;
        },
        changeTableRowById(state, action) {
            state.isActive = false
            state.editMode = false;
            let i = 0;
            for(let e in state.tableRow[action.payload].element){
                state.tableRow[action.payload].element[e] = i === 2 ? state.tableRow[action.payload].element[e] : state.inputInfo[i].text
                i++  
            }
            state.currentRowId = null;
            state.inputInfo.forEach((e) => {
                e.text = ``;
            });
            
        },
        turnEditModeById(state, action) {
            state.isActive = !state.isActive
            state.currentRowId = action.payload;
            for(let i = 0; i <= 5; i++){
                state.inputInfo[i].text  = Object.values(state.tableRow[action.payload].element)[i];
            }
            state.editMode = true;
        },
        toggleFlagById(state, action) {
            state.tableRow[action.payload].flag = !state.tableRow[action.payload].flag
        },
        changeCompVehiclesById(state, action) {
            const targetRow =  state.tableRow[action.payload.indexRow].element.compVehicles[action.payload.indexVeh];
            targetRow.name = state.inputInfo[6].text;
            targetRow.model = state.inputInfo[7].text;
            targetRow.year = state.inputInfo[8].text;
            for(let i = 6; i <= 8; i++){
                state.inputInfo[i].text = ``;
            }
        },
        addNewCompVehicleByRowId(state, action) {
            const targetRow =  state.tableRow[action.payload.indexRow].element.compVehicles;
            const newCompVehicle = {
                name:action.payload.name,
                model:action.payload.model,
                year:action.payload.year
            }
            targetRow.push(newCompVehicle)
            for(let i = 6; i <= 8; i++){
                state.inputInfo[i].text = ``;
            }
        },
        deleteCompVehiclesById(state, action) {
            const targetCompVehiclesArr =  state.tableRow[action.payload.indexRow].element.compVehicles;
            targetCompVehiclesArr.splice(action.payload.indexVeh,1)
            for(let i = 6; i <= 8; i++){
                state.inputInfo[i].text = ``;
            }
        },
        killPanel(state, action) {
            state.editMode = false;
            state.isActive = false;
            state.currentRowId = null;
        },
        minusCountById(state, action) {
            state.tableRow[action.payload.spareId].element.quantity = state.tableRow[action.payload.spareId].element.quantity - action.payload.count
        }
    },

});

export const {
    minusCountById,
    killPanel,
    deleteRowById,
    returnRowById,
    togglePreDeleteById,
    setInputValueById,
    addNewWorkShop,
    changeTableRowById,
    turnEditModeById,
    toggleIsActive,
    toggleFlagById,
    changeCompVehiclesById,
    addNewCompVehicleByRowId,
    deleteCompVehiclesById,
} = sparesSlice.actions;
export default sparesSlice.reducer;
