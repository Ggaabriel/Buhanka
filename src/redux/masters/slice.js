import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentRowId: null,
    tableHeader: [
        `ФИО`,
        `Должность`,
        `Номер тел.`,
        `Ставка`,
        `Мастерская`,
        `Действия`,
    ],
    tableRow: [
        {
            id: 0,
            element: {
                name:`Аркадий Анатолиевич`,
                job: `Смазчик карбюраторов`,
                number: `88005553535`,
                moneyType: `сдельная`,
                workshop:`Очень длинное название для Мастерской`
            },
            deleted: false,
            preDelete: false,
        },
        {
            id: 1,
            element: {
                name:`Михаил Степаныч`,
                job: `Смазчик карбюраторов`,
                number: `88001234567`,
                moneyType: `10%`,
                workshop:`Очень длинное название для Мастерской`
            },
            deleted: false,
            preDelete: false,
        },
    ],
    inputInfo: [
        {
            id: 0,
            title: `ФИО`,
            text: ``,
            desc: `Инициалы для Вашего удобства в идентификации исполнителя`,
        },
        {
            id: 1,
            title: `Должность`,
            text: ``,
            desc: `Должность, будет использоваться в составлении актов`,
        },
        {
            id: 2,
            title: `Номер телефона`,
            text: ``,
            desc: `Номер телефона будет использоваться в составлении актов, а так же нужна для идентификации исполнителя`,
        },
        {
            id: 3,
            title: `Ставка`,
            select:[
                `сдельная`,
                `%`
            ],
            option:``,
            text:``,
            desc: `Ставка, для опредления расценок исполнителя`,
        },
        {
            id: 4,
            title: `Мастерская`,
            text: ``,
            desc: `Мастерская, будет использоватся в актах`,
            searchPage:`workshop`,
            searchRow:`title`,
        },
    ],
    isActive: false,
    editMode: false,
};

const mastersSlice = createSlice({
    name: `masters`,
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
        setOptionValueById(state, action) {
            state.inputInfo[action.payload.id].option = action.payload.option;
            state.inputInfo[action.payload.id].text = action.payload.option === `%`? ``: action.payload.option
        },
        addNewWorkShop(state, action) {
            state.isActive = false
            const newWorkShop = {
                id: state.tableRow.length,
                element: {
                    name: state.inputInfo[0].text,
                    job: state.inputInfo[1].text,
                    number: state.inputInfo[2].text,
                    moneyType: state.inputInfo[3].text !== `сдельная` && state.inputInfo[2].text !== `` ? `${state.inputInfo[2].text}%` : state.inputInfo[2].text,
                    workshop: state.inputInfo[4].text,
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
                if(e.option !== undefined){
                    e.option = ``;
                }
            });
            state.isActive = !state.isActive;
        },
        changeTableRowById(state, action) {
            state.isActive = false
            state.editMode = false;
            let i = 0;
            for(let e in state.tableRow[action.payload].element){
                state.tableRow[action.payload].element[e] = i === 3 && state.inputInfo[i].text !== `сдельная` && state.inputInfo[2].text !== `` ? `${state.inputInfo[i].text}%` : state.inputInfo[i].text;
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
            for(let i = 0; i <= 4; i++){
                state.inputInfo[i].text  = Object.values(state.tableRow[action.payload].element)[i].replace(/%/g, "");
                if(state.inputInfo[i].option !== undefined){
                    state.inputInfo[i].option = Object.values(state.tableRow[action.payload].element)[i].split(``).includes(`%`) ? `%` : state.inputInfo[i].text;
                }
            }
            state.editMode = true;
        },
        killPanel(state, action) {
            state.editMode = false;
            state.inputInfo.forEach((e) => {
                e.text = ``;
                if(e.option !== undefined){
                    e.option = ``;
                }
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
    setOptionValueById,
} = mastersSlice.actions;
export default mastersSlice.reducer;
