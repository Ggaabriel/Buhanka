import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentRowId: null,
    tableHeader: [
        `Название`,
        `Год`,
        `Рег. номер`,
        `Пробег`,
        `VIN`,
        `Владелец`,
        `Актов`,
        `Действия`,
    ],
    tableRow: [
        {
            id: 0,
            element: {
                mark: `Toyota Camry`,
                year: `2006`,
                carNumber: `А4332Г 39`,
                mileage: `135 000 км`,
                vin: `JF2SJAAC3GH458441`,
                owner: `Фамилия Имя Отчество`,
                acts: `1`,
            },
            deleted: false,
            preDelete: false,
        },
        {
            id: 1,
            element: {
                mark: `Лада Приора`,
                year: `2000`,
                carNumber: `11111 39`,
                mileage: `0 км`,
                vin: `JF2SJAAC3GH458111`,
                owner: `Серёжкин Сергей Сергеевич`,
                acts: `1`,
            },
            deleted: false,
            preDelete: false,
        },
    ],
    inputInfo: [
        {
            id: 0,
            title: `Марка`,
            text: ``,
        },
        {
            id: 1,
            title: `Модель`,
            text: ``,
        },
        {
            id: 2,
            title: `Год`,
            text: ``,
        },
        {
            id: 3,
            title: `Региональный Номер`,
            text: ``,
        },
        {
            id: 4,
            title: `Пробег`,
            text: ``,
        },
        {
            id: 5,
            title: `VIN`,
            text: ``,
        },
        {
            id: 6,
            title: `Номер телефона`,
            text: ``,
            searchPage:`clients`,
            searchRow:`number`,
        },
    ],
    isActive: false,
    editMode: false,
};

const vehiclesSlice = createSlice({
    name: `vehicles`,
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
        setVehiclesInputValueById(state, action) {
            state.inputInfo[action.payload.id].text = action.payload.text;
        },
        addNewVehicleWithOwner(state, action) {
            state.isActive = false
            const newWorkShop = {
                id: state.tableRow.length,
                element: {
                    mark: `${state.inputInfo[0].text} ${state.inputInfo[1].text}`,
                    year: state.inputInfo[2].text ,
                    carNumber:  state.inputInfo[3].text,
                    mileage: state.inputInfo[4].text,
                    vin: state.inputInfo[5].text,
                    owner: action.payload,
                    acts: null,
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
        changeVehicleByIdWithOwner(state, action) {
            state.isActive = false
            state.editMode = false;
            let i = 0;
            for(let e in state.tableRow[action.payload.id].element){
                if(e === `mark`) {
                    state.tableRow[action.payload.id].element[e] = state.inputInfo[i].text + ` ` + state.inputInfo[i+1].text
                }else if(e === `owner`){
                    debugger
                    state.tableRow[action.payload.id].element[e] = action.payload.owner;
                } 
                else if(e !== `acts`){
                     state.tableRow[action.payload.id].element[e] = state.inputInfo[i+1].text
                }
                
                i++  
            }
            state.currentRowId = null;

            state.inputInfo.forEach((e) => {
                e.text = ``;
            });
            
        },
        turnEditVehicleById(state, action) {
            state.isActive = false
            state.currentRowId = action.payload;
            for(let i = 0; i <= 5; i++){
                switch (i) {
                    case 0:
                        state.inputInfo[i].text = Object.values(state.tableRow[action.payload].element)[i].split(' ')[0];
                    break
                    case 1:
                        state.inputInfo[i].text = Object.values(state.tableRow[action.payload].element)[i-1].split(' ')[1];
                    break
                    default:
                        state.inputInfo[i].text = Object.values(state.tableRow[action.payload].element)[i-1];
                    break
                }
                    
                
            }
            state.editMode = true;
        },
        killPanelVehicles(state, action) {
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
    killPanelVehicles,
    deleteRowById,
    returnRowById,
    togglePreDeleteById,
    setVehiclesInputValueById,
    addNewVehicleWithOwner,
    changeVehicleByIdWithOwner,
    turnEditVehicleById,
    toggleIsActive,
} = vehiclesSlice.actions;
export default vehiclesSlice.reducer;
