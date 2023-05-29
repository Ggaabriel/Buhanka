import React from "react";
import { useDispatch } from "react-redux";
import s from "./panel.module.css";

const Panel = ({
    currentPage,
    changeTextById,
    addTableRow,
    toggleIsActive,
    changeTableRowById,
    targetInfo,
    setOptionValueById,
}) => {
    const dispatch = useDispatch();
    const addRow = (e) => {
        e.preventDefault();
        currentPage.editMode
            ? dispatch(changeTableRowById(currentPage.currentRowId))
            : dispatch(addTableRow());
    };
    return (
        <div className={s.panel__wrapper}>
            <form className={s.panel__form} onSubmit={addRow}>
                <h2 className={s.panel__headline}>Добавить мастерскую</h2>
                {currentPage.inputInfo.map((e) => {
                    return (
                        <div className={s.panel__block}>
                            <label className={s.panel__label}>{e.title}</label>
                            {e.select ? (
                                <>
                                    <select
                                        value={
                                            e.option === ``
                                                ? e.text.split(``).includes(`%`)
                                                    ? `%`
                                                    : e.text
                                                : e.option
                                        }
                                        onChange={(elem) =>
                                            dispatch(
                                                setOptionValueById({
                                                    id: e.id,
                                                    option: elem.target.value,
                                                })
                                            )
                                        }
                                    >
                                        <option value="">выберите</option>
                                        {e.select.map((elem) => {
                                            return (
                                                <option value={elem}>
                                                    {elem}
                                                </option>
                                            );
                                        })}
                                    </select>
                                    {e.option === `%` && (
                                        <input
                                            type="text"
                                            className={s.panel__input}
                                            value={e.text === `%` ? `` : e.text}
                                            onChange={(elem) =>
                                                dispatch(
                                                    changeTextById({
                                                        id: e.id,
                                                        text: elem.target.value,
                                                    })
                                                )
                                            }
                                        />
                                    )}
                                </>
                            ) : (
                                // Снизу информация о полях которые ищет пользователь
                                // Работает она через наличие поисковой страницы в хранилище и передачей сюда объекта с информацией о нужных блоках
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
                                    {e.searchPage && e.text !== `` && (
                                        <div className={s.panel__searchRow}>
                                            {targetInfo[e.searchPage].tableRow.map((elem) => (
                                                <div
                                                    onClick={() => {
                                                        dispatch(
                                                            changeTextById({
                                                                id: e.id,
                                                                text: elem.element[e.searchRow],
                                                            })
                                                        );
                                                        console.log(elem);
                                                    }}
                                                >
                                                    {elem.element[e.searchRow]
                                                        .toLowerCase()
                                                        .includes(
                                                            e.text.toLowerCase()
                                                        )
                                                        ? elem.element[
                                                              e.searchRow
                                                          ]
                                                        : null}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            )}

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

export default Panel;
