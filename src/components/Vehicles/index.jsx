
import React, { useEffect } from 'react'

import Table from '../Table';
import { useDispatch, useSelector } from 'react-redux';
import {addNewVehicleWithOwner, changeVehicleByIdWithOwner, deleteRowById, killPanelVehicles, returnRowById, setVehiclesInputValueById, toggleIsActive, togglePreDeleteById, turnEditVehicleById } from '../../redux/vehicles/slice';
import DoublePanel from './DoublePanel';
import { addNewWorkShop, changeTableRowById, setInputValueById, turnEditModeById } from '../../redux/clients/slice';

const Vehicles = () => {
    const vehicles = useSelector((state)=> state.vehicles);
    const clients = useSelector((state)=> state.clients);
    const auth = useSelector((state)=> state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        return () => {
            dispatch(killPanelVehicles());
        }
    },[dispatch])

    return (
        <section className="main">
            <div className="heading">
                <h1>Транспортные средства</h1>
               {auth.isAuth &&( <button className="little_btn" onClick={()=> dispatch(toggleIsActive())}>Добавить</button>)}
            </div>
            <div className="main">
               <Table currentPage={vehicles} deleteRowById={deleteRowById} returnRowById={returnRowById} togglePreDeleteById={togglePreDeleteById} turnEditModeById={turnEditVehicleById}/>
            </div>
            {vehicles.isActive || vehicles.editMode ? <DoublePanel currentPage={vehicles} changeTextById={setInputValueById} setVehiclesInputValueById={setVehiclesInputValueById} addTableRow={addNewWorkShop} toggleIsActive={toggleIsActive} changeTableRowById={changeTableRowById} addNewVehicleWithOwner={addNewVehicleWithOwner} changeVehicleByIdWithOwner={changeVehicleByIdWithOwner} turnEditModeById={turnEditModeById} targetInfo={{clients:clients}} />:null}
        </section>
    )
}

export default Vehicles
