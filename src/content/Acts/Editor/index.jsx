import React from "react";
import s from "./creating.module.css";
import Personality from "./Personality";
import Service from "./Service";
import Spares from "./Spares";
import Masters from "./Masters";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import { closeActById, setElementById } from "../../../redux/acts/slice";

const CreateAct = () => {
    const dispatch = useDispatch();
    const [ohNo, setOhNo] = useState(false);
    const [close, setClose] = useState(``);
    const acts = useSelector((state) => state.acts);

    const location = useLocation();

    const currentRow = +location.pathname.match(/\d+/)[0];

    const getActClose = () => {
        function checkLength(data) {
            return String(data).length === 1 ? `0${data}` : data;
        }
        const now = new Date();
        return `${checkLength(now.getDate())}.${checkLength(now.getMonth() + 1)}.${now.getFullYear()} ${checkLength(
            now.getHours()
        )}:${checkLength(now.getMinutes())}`;
    };

    return (
        <section className="main">
            <div className="heading">
                <h1>Создание Акта</h1>
            </div>

            <div className={s.wrapper}>
                {/* Транспортное средство и владелец */}
                <Personality />

                {/* Услуги */}
                <Service />

                {/* Запчасти */}
                <Spares />

                {/* Исполнители */}
                <Masters />

                {!acts.tableRow[currentRow].actClose && (<div className={s.endButtonArea}>
                    <button
                        onClick={() => {
                            setOhNo(true);
                            setClose(getActClose())
                        }}
                    >
                        Закрыть акт
                    </button>
                    {ohNo && (
                        <div>
                            <h1
                                onClick={() => {
                                    setOhNo(false);
                                }}
                            >
                                Закрыть
                            </h1>
                            <h2>Вы уверены?</h2>
                            <p>После закрытия акта, его уже будет невозможно редактировать!!!</p>
                            <div>
                                <p>Время Открытия акта</p>
                                <input type="text" value={acts.tableRow[currentRow].element.actOpen} onChange={(elem)=>{
                                    dispatch(setElementById({
                                        id:currentRow,
                                        area:`actOpen`,
                                        text: elem.target.value
                                    }))
                                }} />
                                <p>Время окончания акта на момент клика</p>
                                <input type="text" value={close} onChange={(elem)=>{setClose(elem.target.value)}} />
                            </div>

                            <NavLink to='/acts' onClick={()=>{
                                dispatch(setElementById({
                                    id:currentRow,
                                    area:`actClose`,
                                    text: close
                                }))
                                dispatch(
                                    closeActById(currentRow)
                                )
                            }}>
                                <button>Точно закрыть акт</button>
                            </NavLink>
                            
                        </div>
                    )}
                </div>)}
            </div>
        </section>
    );
};

export default CreateAct;
