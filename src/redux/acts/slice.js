import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentRowId: null,
    tableHeader: [`№`, `Мастерская`, `ТС`, `Год`, `Рег. номер`, `Пробег`, `Владелец`, `Открытие акта`, `Закрытие акта`],
    tableRow: [
        // {
        //     id: 0,
        //     element: {
        //         numb: `1`,
        //         workshop: ``,
        //         mark: `Toyota Camry`,
        //         year: `2006`,
        //         carNumber: `A4332Г 39`,
        //         mileage: `135 000 км`,
        //         owner: `Фамилия Имя Отчество`,
        //         actOpen: `10.03.2022 12:55`,
        //         actClose: ``,
        //     },
        //     actInfo: {
        //         mark: `Toyota Camry`,
        //         carNumber: `A4332Г 39`,
        //         year: `2006`,
        //         mileage: `135 000 км`,
        //         vin: `JF2SJAAC3GH458441`,
        //         owner: `Фамилия Имя Отчество`,
        //         number: `+7(966)123-34-84`,
        //         email: `asdf@gmail.com`,
        //         discount: `10%`,
        //         message: ``,
        //         workshop: ``,
        //     },
        //     services: [

        //     ],
        //     servicesSum: 0,
        //     spares: [

        //     ],
        //     sparesSum: 0,
        //     masters: [

        //     ],
        //     mastersSum: 0,
        //     actClose: false,
        // },
    ],
    inputInfo: [
        {
            id: 0,
            title: `VIN`,
            text: ``,
            searchPage: `vehicles`,
            searchRow: `vin`,
        },
    ],
    isActive: false,
    editMode: false,


};

const actsSlice = createSlice({
    name: `acts`,
    initialState,
    reducers: {
        closeActById(state, action){
            state.tableRow[action.payload].actClose = true;
        },
        setActInfoById(state, action) {
            switch (action.payload.area) {
                case `mark`:
                    state.tableRow[action.payload.id].actInfo[action.payload.area] = action.payload.text;
                    state.tableRow[action.payload.id].element[action.payload.area] = action.payload.text;
                    break;
                case `carNumber`:
                    state.tableRow[action.payload.id].actInfo[action.payload.area] = action.payload.text;
                    state.tableRow[action.payload.id].element[action.payload.area] = action.payload.text;
                    break;
                case `year`:
                    state.tableRow[action.payload.id].actInfo[action.payload.area] = action.payload.text;
                    state.tableRow[action.payload.id].element[action.payload.area] = action.payload.text;
                    break;
                case `mileage`:
                    state.tableRow[action.payload.id].actInfo[action.payload.area] = action.payload.text;
                    state.tableRow[action.payload.id].element[action.payload.area] = action.payload.text;
                    break;
                case `vin`:
                    state.tableRow[action.payload.id].actInfo[action.payload.area] = action.payload.text;
                    break;
                case `owner`:
                    state.tableRow[action.payload.id].actInfo[action.payload.area] = action.payload.text;
                    state.tableRow[action.payload.id].element[action.payload.area] = action.payload.text;
                    break;
                case `number`:
                    state.tableRow[action.payload.id].actInfo[action.payload.area] = action.payload.text;
                    break;
                case `email`:
                    state.tableRow[action.payload.id].actInfo[action.payload.area] = action.payload.text;
                    break;
                case `discount`:
                    state.tableRow[action.payload.id].actInfo[action.payload.area] = action.payload.text;
                    break;
                case `message`:
                    state.tableRow[action.payload.id].actInfo[action.payload.area] = action.payload.text;
                    break;
                case `workshop`:
                    state.tableRow[action.payload.id].actInfo[action.payload.area] = action.payload.text;
                    break;
                    default:
                        break
            }
        },
        setElementById(state, action) {
            switch (action.payload.area) {
                case `mark`:
                    state.tableRow[action.payload.id].element[action.payload.area] = action.payload.text;
                    break;
                case `carNumber`:
                    state.tableRow[action.payload.id].element[action.payload.area] = action.payload.text;
                    break;
                case `year`:
                    state.tableRow[action.payload.id].element[action.payload.area] = action.payload.text;
                    break;
                case `mileage`:
                    state.tableRow[action.payload.id].element[action.payload.area] = action.payload.text;
                    break;
                case `owner`:
                    state.tableRow[action.payload.id].element[action.payload.area] = action.payload.text;
                    break;
                    case `actOpen`:
                    state.tableRow[action.payload.id].element[action.payload.area] = action.payload.text;
                    break;
                    case `actClose`:
                    state.tableRow[action.payload.id].element[action.payload.area] = action.payload.text;
                    break;
                    default:
                        break
            }
        },
        setActInputValueById(state, action) {
            state.inputInfo[action.payload.id].text = action.payload.text;
        },
        addNewAct(state, action) {
            state.isActive = false;
            const now = new Date();
            function checkLength(data) {
                return String(data).length === 1 ? `0${data}` : data;
            }
            const newAct = {
                id: state.tableRow.length,
                element: {
                    numb:  `${state.tableRow.length+1}`,
                    workshop:  ``,
                    mark:  ``,
                    year:  ``,
                    carNumber:  ``,
                    mileage:  ``,
                    owner:  ``,
                    actOpen: `${checkLength(now.getDate())}.${checkLength(
                        now.getMonth() + 1
                    )}.${now.getFullYear()} ${checkLength(now.getHours())}:${checkLength(now.getMinutes())}`,
                    actClose:  ``,
                },
                actInfo: {
                    mark: `Транспортное средство`,
                    carNumber: `Рег. номер`,
                    year: `Год`,
                    mileage: `Пробег`,
                    vin: `VIN`,
                    owner: `Фамилия Имя Отчество`,
                    number: `Номер. тел`,
                    email: `Почта`,
                    discount: `Скидка`,
                    message: ``,
                    workshop: ``,
                },
                services: [
                ],
                servicesSum: 0,
                spares: [
                ],
                sparesSum: 0,
                masters: [
                ],
                mastersSum: 0,
                actClose: false,
            };
            state.tableRow.push(newAct);
        },
        toggleIsActive(state, action) {
            state.editMode = false;
            state.inputInfo.forEach((e) => {
                e.text = ``;
            });
            state.isActive = !state.isActive;
            state.currentRowId = null;
        },
        addnewService(state, action) {
            const newService = {
                serviceId: action.payload.serviceId,
                hourse: action.payload.hourse,
            };
            state.tableRow[action.payload.id].services.push(newService);
        },
        changeHourseById(state, action) {
            state.tableRow[action.payload.id].services[action.payload.serviceId].hourse = action.payload.hourse;
        },
        deleteNewServiceById(state, action) {
            state.tableRow[action.payload.id].services.splice(action.payload.serviceId, 1);
        },
        setServiceSum(state, action) {
            state.tableRow[action.payload.id].servicesSum = action.payload.value;
        },

        addnewSpare(state, action) {
            const newSpare = {
                spareId: action.payload.spareId,
                count: action.payload.count,
            };
            state.tableRow[action.payload.id].spares.push(newSpare);
        },
        changeCountById(state, action) {
            state.tableRow[action.payload.id].spares[action.payload.spareId].count = action.payload.count;
        },
        deleteNewSpareById(state, action) {
            state.tableRow[action.payload.id].spares.splice(action.payload.spareId, 1);
        },
        setSparesSum(state, action) {
            state.tableRow[action.payload.id].sparesSum = action.payload.value;
        },

        deleteNewMasterById(state, action) {
            state.tableRow[action.payload.id].masters.splice(action.payload.masterId, 1);
        },
        addnewMaster(state, action) {
            debugger
            const newMaster = {
                masterId: action.payload.masterId,
                masterMoney: action.payload.masterMoney,
            };
            state.tableRow[action.payload.id].masters.push(newMaster);
        },
        setMasterMoneyById(state, action) {
            state.tableRow[action.payload.id].masters[action.payload.masterId].masterMoney = action.payload.masterMoney;
        },
        setMastersSum(state, action) {
            state.tableRow[action.payload.id].mastersSum = action.payload.value;
        },
    },
});

export const {
    closeActById,
    setElementById,
    setActInfoById,
    addNewAct,
    setMastersSum,
    setServiceSum,
    setSparesSum,
    deleteNewMasterById,
    addnewMaster,
    setMasterMoneyById,
    deleteNewSpareById,
    changeCountById,
    addnewSpare,
    deleteNewServiceById,
    addnewService,
    changeHourseById,
    setActInputValueById,
    turnEditModeById,
    toggleIsActive,
} = actsSlice.actions;
export default actsSlice.reducer;
