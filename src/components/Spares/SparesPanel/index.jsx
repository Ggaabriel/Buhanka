import React from "react";
import { useDispatch } from "react-redux";
import s from "./panel.module.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const SparesPanel = ({
    currentPage,
    changeTextById,
    addTableRow,
    toggleIsActive,
    changeTableRowById,
    changeCompVehiclesById,
    addNewCompVehicleByRowId,
    deleteCompVehiclesById,
}) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [id, setId] = useState(null);
    const [id2, setId2] = useState(null);
    const addRow = (e) => {
        e.preventDefault();
        currentPage.editMode
            ? dispatch(changeTableRowById(currentPage.currentRowId))
            : dispatch(addTableRow(+location.pathname[location.pathname.length - 1]));
    };
    const inputs = currentPage.inputInfo;
    return (
        <div className={s.panel__wrapper}>
            <form className={s.panel__form} onSubmit={addRow}>
                <h2 className={s.panel__headline}>Добавить Запчасти</h2>
                {/* 1 */}
                <div className={s.panel__block}>
                    <label className={s.panel__label}>{inputs[0].title}</label>

                    <input
                        type="text"
                        className={s.panel__input}
                        value={inputs[0].text}
                        onChange={(elem) =>
                            dispatch(
                                changeTextById({
                                    id: inputs[0].id,
                                    text: elem.target.value,
                                })
                            )
                        }
                    />
                </div>
                {/* 2 */}
                <div className={s.panel__block}>
                    <label className={s.panel__label}>{inputs[1].title}</label>

                    <input
                        type="text"
                        className={s.panel__input}
                        value={inputs[1].text}
                        onChange={(elem) =>
                            dispatch(
                                changeTextById({
                                    id: inputs[1].id,
                                    text: elem.target.value,
                                })
                            )
                        }
                    />
                </div>

                {/* 3 */}

                {currentPage.currentRowId !== null && (
                    <div className={s.panel__block}>
                        <h3>{inputs[2].title}</h3>
                        <div className={s.panel__compVehicles}>
                            <div className={s.panel__block1}>
                                <label className={s.panel__label}>Марка</label>
                                <input
                                    type="text"
                                    className={s.panel__input}
                                    value={inputs[6].text}
                                    onChange={(elem) =>
                                        dispatch(
                                            changeTextById({
                                                id: inputs[6].id,
                                                text: elem.target.value,
                                            })
                                        )
                                    }
                                />
                            </div>
                            <div className={s.panel__block1}>
                                <label className={s.panel__label}>Модель</label>
                                <input
                                    type="text"
                                    className={s.panel__input}
                                    value={inputs[7].text}
                                    onChange={(elem) =>
                                        dispatch(
                                            changeTextById({
                                                id: inputs[7].id,
                                                text: elem.target.value,
                                            })
                                        )
                                    }
                                />
                            </div>
                            <div className={s.panel__block1}>
                                <label className={s.panel__label}>Год</label>
                                <input
                                    type="text"
                                    className={s.panel__input}
                                    value={inputs[8].text}
                                    onChange={(elem) =>
                                        dispatch(
                                            changeTextById({
                                                id: inputs[8].id,
                                                text: elem.target.value,
                                            })
                                        )
                                    }
                                />
                            </div>
                        </div>
                        {currentPage.tableRow.map((a, indexRow) => {
                            return a.element.compVehicles.map((b, indexVeh) => {
                                return (
                                    currentPage.currentRowId === indexRow ?
                                    <p
                                        onClick={() => {
                                            dispatch(
                                                changeTextById({
                                                    id: inputs[6].id,
                                                    text: b.name,
                                                })
                                            );
                                            dispatch(
                                                changeTextById({
                                                    id: inputs[7].id,
                                                    text: b.model,
                                                })
                                            );
                                            dispatch(
                                                changeTextById({
                                                    id: inputs[8].id,
                                                    text: b.year,
                                                })
                                            );
                                            setId(indexVeh);
                                            setId2(indexRow);
                                        }}
                                    >
                                        <span>
                                            {b.name + ` ` + b.model + ` ` + b.year}
                                        </span>
                                    </p>
                                    :
                                    null
                                );
                            });
                        })}

                        <div>
                        <input
                                type="button"
                                className={`${s.panel__cancellation} pointer`}
                                value="Добавить"
                                onClick={() => {
                                    dispatch(
                                        addNewCompVehicleByRowId({
                                            name: currentPage.inputInfo[6].text,
                                            model: currentPage.inputInfo[7]
                                                .text,
                                            year: currentPage.inputInfo[8].text,
                                            indexRow: currentPage.currentRowId,
                                        })
                                    );
                                    setId(null);
                                    setId2(null);
                                    
                                }}
                            />

                            {id !== null && (
                                <input
                                type="button"
                                value="Применить изменения"
                                className={`${s.panel__submit} pointer`}
                                onClick={() => {
                                    dispatch(
                                        changeCompVehiclesById({
                                            indexRow: currentPage.currentRowId,
                                            indexVeh: id,
                                        })
                                    );
                                    setId(null);
                                    setId2(null);
                                }}
                            />
                            )}
                            
                            
                            {id !== null && (
                                <input
                                    type="button"
                                    className={`${s.panel__cancellation} pointer`}
                                    value="Удалить"
                                    onClick={() => {
                                        dispatch(
                                            deleteCompVehiclesById({
                                                indexRow: id2,
                                                indexVeh: id,
                                            })
                                        );
                                        setId(null);
                                        setId2(null);
                                    }}
                                />
                            )}
                        </div>
                    </div>
                )}

                {/* 4 */}
                <div className={s.panel__block}>
                    <label className={s.panel__label}>{inputs[3].title}</label>

                    <input
                        type="text"
                        className={s.panel__input}
                        value={inputs[3].text}
                        onChange={(elem) =>
                            dispatch(
                                changeTextById({
                                    id: inputs[3].id,
                                    text: elem.target.value,
                                })
                            )
                        }
                    />
                </div>
                {/* 5 */}
                <div className={s.panel__block}>
                    <label className={s.panel__label}>{inputs[4].title}</label>

                    <input
                        type="text"
                        className={s.panel__input}
                        value={inputs[4].text}
                        onChange={(elem) =>
                            dispatch(
                                changeTextById({
                                    id: inputs[4].id,
                                    text: elem.target.value,
                                })
                            )
                        }
                    />
                </div>

                {/* 6 */}
                <div className={s.panel__block}>
                    <label className={s.panel__label}>{inputs[5].title}</label>

                    <input
                        type="text"
                        className={s.panel__input}
                        value={inputs[5].text}
                        onChange={(elem) =>
                            dispatch(
                                changeTextById({
                                    id: inputs[5].id,
                                    text: elem.target.value,
                                })
                            )
                        }
                    />
                </div>
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

export default SparesPanel;
