import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ReactComponent as Close } from "../../../assets/img/icons/acts/close.svg";
import {
    changeServiceTableRowById,
    setServiceInputValueById,
    turnServiceEditModeById,
} from "../../../redux/services/slice";
import s from "./creating.module.css";
import { addnewService, changeHourseById, deleteNewServiceById, setServiceSum } from "../../../redux/acts/slice";
import { useLocation } from "react-router-dom";

const Service = () => {
    const dispatch = useDispatch();
    const services = useSelector((state) => state.services);
    const acts = useSelector((state) => state.acts);
    const [showServices, setShowServices] = useState(false);
    const location = useLocation();

    const currentRow = +location.pathname.match(/\d+/)[0];
    useEffect(() => {
        dispatch(
            setServiceSum({
                value: acts.tableRow[currentRow].services.reduce((accum, elem) => {
                    return (
                        accum +
                        +services.tableRow[elem.serviceId].element.price *
                            +services.tableRow[elem.serviceId].element.rate *
                            elem.hourse
                    );
                }, 0),
                id: currentRow,
            })
        );
    }, [acts.services, services.tableRow, dispatch, currentRow, acts.tableRow]);

    const changeText = (id, serviceId, text) => {
        dispatch(
            setServiceInputValueById({
                id: id,
                text: text,
            })
        );
        dispatch(changeServiceTableRowById(serviceId));
        dispatch(turnServiceEditModeById(serviceId));
    };

    return (
        <>
            <div className={s.servicesInfo}>
                <h2>Выполненные Работы</h2>
                <h2>Итого стоимость работ: {acts.tableRow[currentRow].servicesSum}</h2>
                <div className={s.servicesInfo__wrapper}>
                    {!acts.tableRow[currentRow].actClose && (
                        <button
                            className="pointer"
                            onClick={() => {
                                setShowServices(!showServices);
                            }}
                        >
                            Добавить Услугу
                        </button>
                    )}

                    {showServices &&
                        services.tableRow.map((elem) => {
                            return (
                                <h3
                                    className="pointer"
                                    onClick={() => {
                                        dispatch(
                                            addnewService({
                                                id: currentRow,
                                                serviceId: elem.id,
                                                hourse: 0,
                                            })
                                        );
                                        setShowServices(!showServices);
                                    }}
                                >
                                    {elem.element.service}
                                </h3>
                            );
                        })}
                </div>
                {acts.tableRow[currentRow].services.map((elem, i) => {
                    return (
                        <div className={s.servicesInfo__wrapper} key={i}>
                            <div>
                                {!acts.tableRow[currentRow].actClose && (
                                    <Close
                                        onClick={() => {
                                            dispatch(deleteNewServiceById({ serviceId: i, id: currentRow }));
                                        }}
                                        className="pointer"
                                    />
                                )}
                            </div>
                            <div className={s.servicesInfo__wrapper__info}>
                                {!acts.tableRow[currentRow].actClose ? (
                                    <div
                                        onClick={() => {
                                            dispatch(turnServiceEditModeById(elem.serviceId));
                                        }}
                                    >
                                        <div>
                                            <p>Название Услуги</p>
                                            <input
                                                type="text"
                                                value={services.tableRow[elem.serviceId].element.service}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <p>Норма времени час</p>
                                            <input
                                                type="text"
                                                value={services.tableRow[elem.serviceId].element.rate}
                                                onChange={(elema) => changeText(1, elem.serviceId, elema.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <p>Стоимость норма часа</p>
                                            <input
                                                type="text"
                                                value={services.tableRow[elem.serviceId].element.price}
                                                onChange={(elema) => changeText(2, elem.serviceId, elema.target.value)}
                                            />
                                        </div>
                                        <div>
                                            <p>Кол-во Часов</p>
                                            <input
                                                type="text"
                                                value={elem.hourse}
                                                onChange={(event) => {
                                                    dispatch(
                                                        changeHourseById({
                                                            id: currentRow,
                                                            serviceId: i,
                                                            hourse: +event.target.value,
                                                        })
                                                    );
                                                }}
                                            />
                                        </div>
                                    </div>
                                ) : (
                                    <div>
                                        <div>
                                            <p>Название Услуги</p>
                                            <input
                                                type="text"
                                                value={services.tableRow[elem.serviceId].element.service}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <p>Норма времени час</p>
                                            <input
                                                type="text"
                                                value={services.tableRow[elem.serviceId].element.rate}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <p>Стоимость норма часа</p>
                                            <input
                                                type="text"
                                                value={services.tableRow[elem.serviceId].element.price}
                                                readOnly
                                            />
                                        </div>
                                        <div>
                                            <p>Кол-во Часов</p>
                                            <input type="text" value={elem.hourse} readOnly />
                                        </div>
                                    </div>
                                )}
                                <div>
                                    <div>
                                        <p>Стоимость работ</p>
                                        <div>
                                            {+services.tableRow[elem.serviceId].element.price *
                                                +services.tableRow[elem.serviceId].element.rate *
                                                elem.hourse}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Service;
