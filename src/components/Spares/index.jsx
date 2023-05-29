import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewCompVehicleByRowId, addNewWorkShop, changeCompVehiclesById, changeTableRowById, deleteCompVehiclesById, deleteRowById, killPanel, returnRowById, setInputValueById, toggleFlagById, toggleIsActive, togglePreDeleteById, turnEditModeById } from '../../redux/spares/slice';
import SparesPanel from './SparesPanel';
import { useEffect } from 'react';
import SparesTable from './SparesTable';

const Spares = () => {
    const spares = useSelector((state)=> state.spares);
    const auth = useSelector((state)=> state.auth);
    const dispatch = useDispatch();

    useEffect(()=>{
        return () => {
            dispatch(killPanel());
        }
    },[dispatch])

    return (
        <section className="main">
            <div className="heading">
                <h1>Запчасти</h1>
                {auth.isAuth && (<button className="little_btn" onClick={()=> dispatch(toggleIsActive())}>Добавить</button>)}
            </div>
            <div className="main">
               <SparesTable toggleFlagById={toggleFlagById} currentPage={spares} deleteRowById={deleteRowById} returnRowById={returnRowById} togglePreDeleteById={togglePreDeleteById} turnEditModeById={turnEditModeById}/>
            </div>
            {spares.isActive || spares.editMode ? <SparesPanel deleteCompVehiclesById={deleteCompVehiclesById} changeCompVehiclesById={changeCompVehiclesById} addNewCompVehicleByRowId={addNewCompVehicleByRowId} currentPage={spares} changeTextById={setInputValueById} addTableRow={addNewWorkShop} toggleIsActive={toggleIsActive} changeTableRowById={changeTableRowById} />:null}
        </section>
    )
}

export default Spares