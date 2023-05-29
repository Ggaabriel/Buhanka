import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../../assets/img/icons/acts/close.svg";
import s from "./creating.module.css";
import { changeTableRowById, setInputValueById, turnEditModeById } from "../../../redux/spares/slice";
import { addnewSpare, changeCountById, deleteNewSpareById, setSparesSum } from "../../../redux/acts/slice";
import { useLocation } from "react-router-dom";

const Spares = () => {
    const dispatch = useDispatch();
    const spares = useSelector((state) => state.spares);
    const acts = useSelector((state) => state.acts);
    const [showServices, setShowServices] = useState(false);

    const location = useLocation();

    const currentRow = +location.pathname.match(/\d+/)[0];

    useEffect(() => {
        dispatch(
            setSparesSum({
                value: acts.tableRow[currentRow].spares.reduce((accum, elem) => {
                    return accum + +spares.tableRow[elem.spareId].element.price * elem.count;
                }, 0),
                id: currentRow,
            })
        );
    }, [acts.spares, spares.tableRow, dispatch, currentRow, acts.tableRow]);

    const changeText = (id, spareId, text) => {
        dispatch(
            setInputValueById({
                id: id,
                text: text,
            })
        );
        dispatch(changeTableRowById(spareId));
        dispatch(turnEditModeById(spareId));
    };

    //     const timerRef = useRef(null);
    //   const minus = useCallback((id1,id2) => {
    //     if (timerRef.current) {
    //       clearTimeout(timerRef.current);
    //     }
    //     timerRef.current = setTimeout(() => {
    //         dispatch(
    //             minusCountById({
    //                 spareId: id1,
    //                 count: id2
    //             })
    //         )
    //     }, 3000);
    //   }, []);

    return (
        <>
            <div className={s.servicesInfo}>
                <h2>Запасные части</h2>
                <h2>Итого стоимость запасных частей: {acts.tableRow[currentRow].sparesSum}</h2>
                <div className={s.servicesInfo__wrapper}>
                    {!acts.tableRow[currentRow].actClose && (<button
                        className="pointer"
                        onClick={() => {
                            setShowServices(!showServices);
                        }}
                    >
                        Добавить запчасть
                    </button>)}
                    {showServices &&
                        spares.tableRow.map((elem) => {
                            return (
                                <h3
                                    className="pointer"
                                    onClick={() => {
                                        dispatch(
                                            addnewSpare({
                                                id: currentRow,
                                                spareId: elem.id,
                                                count: 0,
                                            })
                                        );
                                        setShowServices(!showServices);
                                    }}
                                >
                                    {elem.element.name}
                                </h3>
                            );
                        })}
                </div>
                {acts.tableRow[currentRow].spares.map((elem, i) => {
                    return (
                        <div className={s.servicesInfo__wrapper} key={i}>
                            <div>
                                {!acts.tableRow[currentRow].actClose && (<Close
                                    onClick={() => {
                                        dispatch(deleteNewSpareById({ spareId: i, id: currentRow }));
                                    }}
                                    className="pointer"
                                />)}
                            </div>
                            {!acts.tableRow[currentRow].actClose ? (<div className={s.servicesInfo__wrapper__info}>
                                <div
                                    onClick={() => {
                                        dispatch(turnEditModeById(elem.spareId));
                                    }}
                                >
                                    <div>
                                        <p>Название запасной части</p>
                                        <input
                                            type="text"
                                            value={spares.tableRow[elem.spareId].element.name}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <p>Ед. Измерения</p>
                                        <input
                                            type="text"
                                            value={spares.tableRow[elem.spareId].element.unit}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <p>Цена за единицу, руб.</p>
                                        <input
                                            type="text"
                                            value={spares.tableRow[elem.spareId].element.price}
                                            onChange={(elema) => changeText(5, elem.spareId, elema.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <p>Кол-во</p>
                                        <input
                                            type="text"
                                            value={elem.count}
                                            onChange={(event) => {
                                                dispatch(
                                                    changeCountById({
                                                        id: currentRow,
                                                        spareId: i,
                                                        count: +event.target.value,
                                                    })
                                                );
                                            }}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p>Стоимость работ</p>
                                        <div>{+spares.tableRow[elem.spareId].element.price * elem.count}</div>
                                    </div>
                                </div>
                            </div>) 
                            :(
                                <div className={s.servicesInfo__wrapper__info}>
                                <div
                                >
                                    <div>
                                        <p>Название запасной части</p>
                                        <input
                                            type="text"
                                            value={spares.tableRow[elem.spareId].element.name}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <p>Ед. Измерения</p>
                                        <input
                                            type="text"
                                            value={spares.tableRow[elem.spareId].element.unit}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <p>Цена за единицу, руб.</p>
                                        <input
                                            type="text"
                                            value={spares.tableRow[elem.spareId].element.price}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <p>Кол-во</p>
                                        <input
                                            type="text"
                                            value={elem.count}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p>Стоимость работ</p>
                                        <div>{+spares.tableRow[elem.spareId].element.price * elem.count}</div>
                                    </div>
                                </div>
                            </div>
                            ) }
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Spares;
