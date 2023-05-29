import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setActInfoById, setActInputValueById } from "../../../redux/acts/slice";
import { addNewWorkShop, changeTableRowById, killPanel, setInputValueById, turnEditModeById } from "../../../redux/clients/slice";
import { addNewVehicleWithOwner, changeVehicleByIdWithOwner, killPanelVehicles, setVehiclesInputValueById, toggleIsActive, turnEditVehicleById } from "../../../redux/vehicles/slice";

import s from "./creating.module.css";
import DoublePanel from "../../../components/Vehicles/DoublePanel";
const Personality = () => {
    const dispatch = useDispatch();

    const acts = useSelector((state) => state.acts);
    const vehicles = useSelector((state) => state.vehicles);
    const clients = useSelector((state) => state.clients);

    const vinInput = acts.inputInfo[0];
    const location = useLocation();

    const currentRow = +location.pathname.match(/\d+/)[0];
    const actInfo = acts.tableRow[currentRow].actInfo;
    //при первой отрисовке заполняет поля с владельцем беря значения из инпутов
    useEffect(() => {
        if (acts.tableRow[currentRow].element.mark !== ``) {
            for (let e in acts.tableRow[currentRow].actInfo) {
                if (acts.tableRow[currentRow].element[e] !== undefined) {
                    dispatch(
                        setActInfoById({
                            id: currentRow,
                            area: e,
                            text: acts.tableRow[currentRow].element[e],
                        })
                    );
                }
            }
        }
    }, [acts.tableRow, currentRow, dispatch, vehicles.editMode]);
    //закрывает панели чтобы не меняли значения в полях
    useEffect(() => {
        return () => {
            dispatch(killPanel());
            dispatch(killPanelVehicles());
            dispatch(
                setActInputValueById({
                    id: 0,
                    text: ``,
                })
            );
        };
    }, [dispatch]);
    //по клику на vin запускается функция заполняющая инпуты и дающая значение currentRowId, потом мы заполняем инпуты клиента, а после инпутов наши поля
    useEffect(() => {
        clients.tableRow.forEach((elem) => {
            if (
                vehicles.tableRow[vehicles.currentRowId] !== undefined &&
                vehicles.tableRow[vehicles.currentRowId].element.owner === elem.element.name
            ) {
                dispatch(turnEditModeById(elem.id));
                for (let e in acts.tableRow[currentRow].actInfo) {
                    if (elem.element[e] !== undefined) {
                        dispatch(
                            setActInfoById({
                                id: currentRow,
                                area: e,
                                text: elem.element[e],
                            })
                        );
                    }
                }
            }
        });
    }, [vehicles.currentRowId, vehicles.tableRow, dispatch, clients.tableRow, acts.tableRow, currentRow]);
    //заполняет инпуты по клику
    const autoInputInInputs = (elem) => {
        dispatch(
            setActInputValueById({
                id: vinInput.id,
                text: elem.element[vinInput.searchRow],
            })
        );
        dispatch(turnEditVehicleById(elem.id));
        for (let e in acts.tableRow[currentRow].actInfo) {
            if (elem.element[e] !== undefined) {
                dispatch(
                    setActInfoById({
                        id: currentRow,
                        area: e,
                        text: elem.element[e],
                    })
                );
            }
        }
    };

    return (
        <>
            {vehicles.isActive ? (
                <DoublePanel
                    currentPage={vehicles}
                    changeTextById={setInputValueById}
                    setVehiclesInputValueById={setVehiclesInputValueById}
                    addTableRow={addNewWorkShop}
                    toggleIsActive={toggleIsActive}
                    changeTableRowById={changeTableRowById}
                    addNewVehicleWithOwner={addNewVehicleWithOwner}
                    changeVehicleByIdWithOwner={changeVehicleByIdWithOwner}
                    turnEditModeById={turnEditModeById}
                    targetInfo={{ clients: clients }}
                />
            ) : null}
            <div className={s.carInfo}>
                <h2>Информация о ТС</h2>
                <div className={s.carInfo__wrapper}>
                    <h1>{actInfo.mark}</h1>
                    <div>
                        <h3>{actInfo.carNumber}</h3>
                        <h3>{actInfo.year}</h3>
                        <h3>{actInfo.mileage}</h3>
                    </div>
                    <h3>{actInfo.vin}</h3>
                    {!acts.tableRow[currentRow].actClose && (
                        <input
                        type="text"
                        value={vinInput.text}
                        onChange={(event) => {
                            dispatch(
                                setActInputValueById({
                                    id: 0,
                                    text: event.target.value,
                                })
                            );
                        }}
                    />
                    )}
                    
                    {vinInput.searchPage && vinInput.text !== `` && (
                        <div className={s.panel__searchRow}>
                            {vehicles.tableRow.map((elem) => (
                                <div
                                    onClick={() => {
                                        autoInputInInputs(elem);
                                        console.log(elem);
                                    }}
                                >
                                    {elem.element[vinInput.searchRow]
                                        .toLowerCase()
                                        .includes(vinInput.text.toLowerCase())
                                        ? elem.element[vinInput.searchRow]
                                        : null}
                                </div>
                            ))}
                        </div>
                    )}

                    {!acts.tableRow[currentRow].actClose && vinInput.text === `` && (
                        <button className="pointer" onClick={() => dispatch(toggleIsActive())}>
                            Добавить транспортное средство
                        </button>
                    )}
                </div>
            </div>

            <div className={s.ownerInfo}>
                <h2>Информация о владельце</h2>
                <div className={s.ownerInfo__wrapper}>
                    <h1>{actInfo.owner}</h1>
                    <div>
                        <h3>{actInfo.number}</h3>
                        <h3>{actInfo.email}</h3>
                        <h3>{actInfo.discount}</h3>
                    </div>
                    {!acts.tableRow[currentRow].actClose && (
                        <>
                         <h3>Причина Обращения</h3>
                         <input type="text" /></>
                    )}
                   
                    
                </div>
            </div>
        </>
    );
};

export default Personality;
