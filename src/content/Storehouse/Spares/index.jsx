import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewCompVehicleByRowId, addNewWorkShop, changeCompVehiclesById, changeTableRowById, deleteCompVehiclesById, deleteRowById, killPanel, returnRowById, setInputValueById, toggleFlagById, toggleIsActive, togglePreDeleteById, turnEditModeById } from '../../../redux/spares/slice';
import { AppContext } from "../../../app/Contexts";
import SparesTable from '../../../components/Spares/SparesTable';
import SparesPanel from '../../../components/Spares/SparesPanel';
import PageHeader from "../../../components/PageHeader";

const Spares = ({ title, subtitle }) => {
    const { setTitle } = useContext(AppContext);
    const spares = useSelector((state)=> state.spares);
    const dispatch = useDispatch();

    useEffect(() => setTitle(title), []);
    useEffect(()=> { return () => { dispatch(killPanel()) }; },[dispatch]);

    return (
        <section className="main g32">
            <PageHeader title={ subtitle } callback={ toggleIsActive } />

            <SparesTable toggleFlagById={toggleFlagById}
                         currentPage={spares}
                         deleteRowById={deleteRowById}
                         returnRowById={returnRowById}
                         togglePreDeleteById={togglePreDeleteById}
                         turnEditModeById={turnEditModeById} />

            {spares.isActive || spares.editMode
                ? <SparesPanel deleteCompVehiclesById={deleteCompVehiclesById}
                               changeCompVehiclesById={changeCompVehiclesById}
                               addNewCompVehicleByRowId={addNewCompVehicleByRowId}
                               currentPage={spares}
                               changeTextById={setInputValueById}
                               addTableRow={addNewWorkShop}
                               toggleIsActive={toggleIsActive}
                               changeTableRowById={changeTableRowById} />
                :null}
        </section>
    )
}

export default Spares