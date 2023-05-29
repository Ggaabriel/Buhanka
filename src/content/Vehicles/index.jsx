import React, {useContext, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from "../../app/Contexts";
import { addNewVehicleWithOwner, changeVehicleByIdWithOwner, deleteRowById, killPanelVehicles, returnRowById, setVehiclesInputValueById, toggleIsActive, togglePreDeleteById, turnEditVehicleById } from '../../redux/vehicles/slice';
import { addNewWorkShop, changeTableRowById, setInputValueById, turnEditModeById } from '../../redux/clients/slice';
import PageHeader from "../../components/PageHeader";
import Table from '../../components/Table';
import DoublePanel from '../../components/Vehicles/DoublePanel';

const Vehicles = ({ title, subtitle }) => {
    const { setTitle } = useContext(AppContext);
    const vehicles = useSelector((state)=> state.vehicles);
    const clients = useSelector((state)=> state.clients);
    const dispatch = useDispatch();

    useEffect(() => setTitle(title), []);
    useEffect(()=> { return () => { dispatch(killPanelVehicles()) }; },[dispatch]);


    return (
        <section className="main g32">
            <PageHeader title={ subtitle } callback={ toggleIsActive } />

            <Table currentPage={vehicles}
                   deleteRowById={deleteRowById}
                   returnRowById={returnRowById}
                   togglePreDeleteById={togglePreDeleteById}
                   turnEditModeById={turnEditVehicleById} />

            {vehicles.isActive || vehicles.editMode
                ? <DoublePanel currentPage={vehicles}
                               changeTextById={setInputValueById}
                               setVehiclesInputValueById={setVehiclesInputValueById}
                               addTableRow={addNewWorkShop}
                               toggleIsActive={toggleIsActive}
                               changeTableRowById={changeTableRowById}
                               addNewVehicleWithOwner={addNewVehicleWithOwner}
                               changeVehicleByIdWithOwner={changeVehicleByIdWithOwner}
                               turnEditModeById={turnEditModeById}
                               targetInfo={{clients:clients}} />
                : null}
        </section>
    )
}

export default Vehicles
