import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentRowId: null,
    tableHeader: [
        `ФИО`,
        `Номер тел.`,
        `Эл. Почта`,
        `Кол-во ТС`,
        `Актов`,
        `Скидка`,
        `Действия`,
    ],
    tableRow: [
        {
            id: 0,
            element: {
                name: `Фамилия Имя Отчество`,
                number: `+7(966)123-34-84`,
                email: `asdf@gmail.com`,
                carCount: null,
                actsCount: 2,
                discount: `10%`
            },
            deleted: false,
            preDelete: false,
        },
        {
            id: 1,
            element: {
                name: `Серёжкин Сергей Сергеевич`,
                number: `123`,
                email: `123@gmail.com`,
                carCount: null,
                actsCount: 2,
                discount: `0%`
            },
            deleted: false,
            preDelete: false,
        },
    ],
    inputInfo: [
        {
            id: 0,
            title: `Фио`,
            text: ``,
            desc: `ФИО будет использоваться в составлении актов`,
        },
        {
            id: 1,
            title: `Номер телефона`,
            text: ``,
            desc: `Номер телефона будет использоваться в составлении актов, а так же нужна для идентификации пользолвателя`,
        },
        {
            id: 2,
            title: `Электронная почта`,
            text: ``,
            desc: `Нужна для идентификации пользовтеля, а так же для маркетинговой рассылки`,
        },
        {
            id: 3,
            title: `Скидка`,
            text: ``,
            desc: `Скидка нужна чтобы стимулировать клиентво пользоваться именно вашими услугами`,
        },
    ],
    isActive: false,
    editMode: false,
};

const clientsSlice = createSlice({
    name: `clients`,
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
                    name: state.inputInfo[0].text,
                    number: state.inputInfo[1].text,
                    email: state.inputInfo[2].text,
                    carCount: null,
                    actsCount: null,
                    discount: `${state.inputInfo[3].text}%`,
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
            const element = state.tableRow[action.payload].element
            let i = 0;
            for(let e in element){
                if(e !== "carCount" && e !== "actsCount"){
                    element[e] = i === 3 ? `${state.inputInfo[i].text}%` : state.inputInfo[i].text
                    i++   
                }
                
            }
            state.currentRowId = null;

            state.inputInfo.forEach((e) => {
                e.text = ``;
            });
            
        },
        turnEditModeById(state, action) {
            state.isActive = !state.isActive
            state.currentRowId = action.payload;
            for(let i = 0; i <= 3; i++){
                state.inputInfo[i].text = Object.values(state.tableRow[action.payload].element)[i === 3? 5: i].replace(/%/g, "")
            }
            state.editMode = true;
        },
        setCarCountById(state, action) {
            state.tableRow[action.payload.id].element.carCount = action.payload.carCount
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
    setCarCountById
} = clientsSlice.actions;
export default clientsSlice.reducer;
