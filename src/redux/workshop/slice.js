import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentRowId: null,
    tableHeader: [
        `Название`,
        `Адрес`,
        `Юр. лицо`,
        `Телефон`,
        `Имя`,
        `Логин`,
        `Пароль`,
        `Действия`,
    ],
    tableRow: [
        {
            id: 0,
            element: {
                title: `Очень длинное название для Мастерской`,
                address: `Ул. Такая ст. 56`,
                company: `ООО “Крутой ремонт”`,
                number: `+795214343312`,
                name: `Фамилия Имя Отчество`,
                login: `logiugjnthnj`,
                password: `passwordasdd`,
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
            desc: `Название для Вашего удобства в идентификации мастерской`,
        },
        {
            id: 1,
            title: `Адрес`,
            text: ``,
            desc: `Адрес будет указываться в актах, которые мастерская формирует`,
        },
        {
            id: 2,
            title: `Название юр. лица`,
            text: ``,
            desc: `Название юридического лица будет указываться в актах, которые мастерская формирует`,
        },
        {
            id: 3,
            title: `Телефон`,
            text: ``,
            desc: `Телефон для связи с мастерской`,
        },
        {
            id: 4,
            title: `Имя`,
            text: ``,
            desc: `Инициалы юридического лица, для удобства связи с человеком`,
        },
        {
            id: 5,
            title: `Логин`,
            text: ``,
            desc: `Логин для входа в аккаунт мастерской`,
        },
        {
            id: 6,
            title: `Пароль`,
            text: ``,
            desc: `Пароль для входа в аккаунт мастерской`,
        },
    ],
    isActive: false,
    editMode: false,
};

const workshopSlice = createSlice({
    name: `workshop`,
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
                    company: state.inputInfo[2].text,
                    number: state.inputInfo[3].text,
                    name: state.inputInfo[4].text,
                    login: state.inputInfo[5].text,
                    password: state.inputInfo[6].text,
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
            state.isActive = !state.isActive
            state.currentRowId = action.payload;
            for(let i = 0; i <= 6; i++){
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
} = workshopSlice.actions;
export default workshopSlice.reducer;
