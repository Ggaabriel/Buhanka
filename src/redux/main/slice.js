import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tableHeader: [
        `№`,
        `Мастерская`,
        `ТС`,
        `Год`,
        `Рег. номер`,
        `Пробег`,
        `Владелец`,
        `Открытие акта`,
        `Закрытие акта`,
    ],
    tableRow: [
        {
            id: 0,
            element: {
                number: `1234`,
                workshop: `Очень длинное название для Мастерской`,
                mark: `Toyota Camry`,
                year: `2006`,
                carNumber: `A4332Г 39`,
                mileage: `135 000 км`,
                owner: `Фамилия Имя Отчество`,
                actOpen: `10.03.2022 12:55`,
                actClose: `10.03.2022 12:55`,
            },
        },
        {
            id: 1,
            element: {
                number: `1234`,
                workshop: `Очень длинное название для Мастерской`,
                mark: `Toyota Camry`,
                year: `2006`,
                carNumber: `A4332Г 39`,
                mileage: `135 000 км`,
                owner: `Фамилия Имя Отчество`,
                actOpen: `10.03.2022 12:55`,
                actClose: `10.03.2022 12:55`,
            },
        },
    ],
};

const mainSlice = createSlice({
    name: `main`,
    initialState,
    reducers: {},
});

// export const {} = mainSlice.actions;
export default mainSlice.reducer;
