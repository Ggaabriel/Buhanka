import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../../assets/img/icons/acts/close.svg";
import s from "./creating.module.css";
import { addnewMaster, deleteNewMasterById, setMasterMoneyById, setMastersSum } from "../../../redux/acts/slice";
import { useLocation } from "react-router-dom";

const Masters = () => {
    const dispatch = useDispatch();
    const masters = useSelector((state) => state.masters);
    const acts = useSelector((state) => state.acts);
    const [showServices, setShowServices] = useState(false);

    const location = useLocation();

    const currentRow = +location.pathname.match(/\d+/)[0];

    useEffect(() => {
        dispatch(
            setMastersSum({
                value: acts.tableRow[currentRow].masters.reduce((accum, elem) => {
                    return accum + +elem.masterMoney;
                }, 0),
                id: currentRow,
            })
        );
        acts.tableRow[currentRow].masters.forEach((elem, i) => {
            dispatch(
                setMasterMoneyById({
                    id: currentRow,
                    masterId: i,
                    masterMoney: masters.tableRow[elem.masterId].element.moneyType.split(``).includes(`%`)
                        ? acts.tableRow[currentRow].servicesSum *
                          (+masters.tableRow[elem.masterId].element.moneyType.slice(0, -1) / 100)
                        : elem.masterMoney,
                })
            );
        });
    }, [acts.masters, dispatch, acts.servicesSum, masters.tableRow, currentRow, acts.tableRow]);

    return (
        <>
            <div className={s.servicesInfo}>
                <h2>Исполнитель работ:</h2>
                <h2>Сумма всех вознаграждений мастеров: {acts.tableRow[currentRow].mastersSum}</h2>
                <div className={s.servicesInfo__wrapper}>
                    {!acts.tableRow[currentRow].actClose && (
                        <button
                            className="pointer"
                            onClick={() => {
                                setShowServices(!showServices);
                            }}
                        >
                            Добавить Мастера
                        </button>
                    )}
                    {showServices &&
                        masters.tableRow.map((elem) => {
                            return (
                                <h3
                                    className="pointer"
                                    onClick={() => {
                                        dispatch(
                                            addnewMaster({
                                                id: currentRow,
                                                masterId: elem.id,
                                                masterMoney: elem.element.moneyType.split(``).includes(`%`)
                                                    ? acts.tableRow[currentRow].servicesSum *
                                                      (+elem.element.moneyType.slice(0, -1) / 100)
                                                    : 0,
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
                {acts.tableRow[currentRow].masters.map((elem, i) => {
                    return (
                        <div className={s.servicesInfo__wrapper} key={i}>
                            <div>
                                {!acts.tableRow[currentRow].actClose && (
                                    <Close
                                        onClick={() => {
                                            dispatch(deleteNewMasterById({ masterId: i, id: currentRow }));
                                        }}
                                        className="pointer"
                                    />
                                )}
                            </div>
                            <div className={s.servicesInfo__wrapper__info}>
                                <div>
                                    <div>
                                        <p>ФИО</p>
                                        <input
                                            type="text"
                                            value={masters.tableRow[elem.masterId].element.name}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <p>Должность</p>
                                        <input
                                            type="text"
                                            value={masters.tableRow[elem.masterId].element.job}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <p>Номер</p>
                                        <input
                                            type="text"
                                            value={masters.tableRow[elem.masterId].element.number}
                                            readOnly
                                        />
                                    </div>
                                    <div>
                                        <p>Ставка</p>
                                        <input
                                            type="text"
                                            value={masters.tableRow[elem.masterId].element.moneyType}
                                            readOnly
                                        />
                                    </div>
                                </div>
                                <div>
                                    <div>
                                        <p>Стоимость работ</p>
                                        <div>
                                            {masters.tableRow[elem.masterId].element.moneyType.split(``).includes(`%`) 
                                            ? (
                                                <p>{elem.masterMoney}</p>
                                            )
                                            : (!acts.tableRow[currentRow].actClose ? (
                                                <input
                                                    type="text"
                                                    value={elem.masterMoney}
                                                    onChange={(event) => {
                                                        dispatch(
                                                            setMasterMoneyById({
                                                                id: currentRow,
                                                                masterId: i,
                                                                masterMoney: +event.target.value,
                                                            })
                                                        );
                                                    }}
                                                />
                                            ) : (
                                                <input type="text" value={elem.masterMoney} readOnly />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
                <h1>
                    Итого всех работ:{" "}
                    {`${
                        acts.tableRow[currentRow].servicesSum +
                        acts.tableRow[currentRow].sparesSum +
                        acts.tableRow[currentRow].mastersSum
                    }`}
                </h1>
            </div>
        </>
    );
};

export default Masters;
