import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import s from "./DoublePanel.module.css";

//Эта панель используется только в транспортных средствах
//Она принимает разные функции например по включению editMode, таким образом можно менять поля в 2-х разных блоках
const TriplePanel = ({
    currentPage,
    changeTextById,
    addTableRow,
    toggleIsActive,
    changeTableRowById,
    targetInfo,
    addNewVehicleWithOwner,
    changeVehicleByIdWithOwner,
    turnEditModeById,
    setVehiclesInputValueById,
}) => {
    const dispatch = useDispatch();
    const addRow = (e) => {
        e.preventDefault();
        
        currentPage.editMode
            ? dispatch(changeVehicleByIdWithOwner({id:currentPage.currentRowId, owner: targetInfo.clients.inputInfo[0].text}))
            : dispatch(addNewVehicleWithOwner(targetInfo.clients.inputInfo[0].text));
        targetInfo.clients.editMode

            ? dispatch(changeTableRowById(targetInfo.clients.currentRowId))
            : dispatch(addTableRow());

        
    };
    //Функция которая срабатывает при клике на номер телефона клиента
    const autoInputInInputs = (vehicle,client) => {
        dispatch(
            setVehiclesInputValueById(
                {
                    id: vehicle.id,
                    text: client.element[vehicle.searchRow],
                }
            )
        );
        dispatch(
            turnEditModeById(
                client.id
            )
        )
    }

    // Снизу код срабатывает, когда мы нажимаем на редактировать или добавить, в блоке транспортные средства
    // Мы перебираем элементы и сравниваем их имена с текущим выбранным полем с именем
    // Тк я добавил зависимости в if стоит пред проверка на пустоту, чтобы приложение не ломалось, currentRowId по стандарту null, и меняется только при редактировании
    useEffect(() => {
        targetInfo.clients.tableRow.forEach((elem) => {
            if (currentPage.tableRow[currentPage.currentRowId] !== undefined && currentPage.tableRow[currentPage.currentRowId].element.owner === elem.element.name) {
                dispatch(turnEditModeById(elem.id));
            }
        });
    }, [
        currentPage.currentRowId,
        currentPage.tableRow,
        dispatch,
        targetInfo.clients.tableRow,
        turnEditModeById,
    ]);

    return (
        <div className={s.panel__wrapper}>
            <form className={s.panel__form} onSubmit={addRow}>
                <h2 className={s.panel__headline}>Добавить мастерскую</h2>
                {currentPage.inputInfo.map((e) => {
                    return (
                        <div className={s.panel__block}>
                            <label className={s.panel__label}>{e.title}</label>
                            {/* // Снизу информация о полях которые ищет пользователь
                                // Работает она через наличие поисковой страницы в хранилище и передачей сюда объекта с информацией о нужных блоках */}
                            <>
                                <input
                                    type="text"
                                    className={s.panel__input}
                                    value={e.text}
                                    onChange={(elem) =>
                                        dispatch(
                                            setVehiclesInputValueById({
                                                id: e.id,
                                                text: elem.target.value,
                                            })
                                        )
                                    }
                                />
                                {e.searchPage && e.text !== `` && (
                                    <div className={s.panel__searchRow}>
                                        {targetInfo[e.searchPage].tableRow.map(
                                            (elem) => (
                                                <div
                                                    onClick={() => autoInputInInputs(e, elem)}
                                                >
                                                    {elem.element[e.searchRow].includes(e.text)? elem.element[e.searchRow]: null}
                                                </div>
                                            )
                                        )}
                                    </div>
                                )}
                            </>
                            <p className={s.panel__description}>{e.desc}</p>
                        </div>
                    );
                })}
                {/* Значение из блока с клиентами */}
                {targetInfo.clients.inputInfo.map((e) => {
                    return (
                        <div className={s.panel__block}>
                            <label className={s.panel__label}>{e.title}</label>
                            <>
                                <input
                                    type="text"
                                    className={s.panel__input}
                                    value={e.text}
                                    onChange={(elem) =>
                                        dispatch(
                                            changeTextById({
                                                id: e.id,
                                                text: elem.target.value,
                                            })
                                        )
                                    }
                                />
                            </>
                            <p className={s.panel__description}>{e.desc}</p>
                        </div>
                    );
                })}
                <div className={s.panel__buttons}>
                    <input
                        type="submit"
                        value="Подтвердить"
                        className={`${s.panel__submit} pointer`}
                    />
                    <input
                        type="button"
                        className={`${s.panel__cancellation} pointer`}
                        value="Отмена"
                        onClick={() => dispatch(toggleIsActive())}
                    />
                </div>
            </form>
        </div>
    );
};

export default TriplePanel;
