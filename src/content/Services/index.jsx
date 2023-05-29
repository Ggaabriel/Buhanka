import React, {useContext, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from "../../app/Contexts";
import { addNewWorkShop, changeServiceTableRowById,  deleteRowById, killPanel, returnRowById, setServiceInputValueById, toggleIsActive, togglePreDeleteById, toggleServicesIsActive, turnEditModeById, turnServiceEditModeById } from '../../redux/services/slice';
import Panel from '../../components/Panel';
import Table from '../../components/Table';
import PageHeader from "../../components/PageHeader";

const Services = ({ title, subtitle }) => {
    const { setTitle } = useContext(AppContext);
    const services = useSelector((state)=> state.services);
    const dispatch = useDispatch();

    useEffect(() => setTitle(title), []);
    useEffect(()=> { return () => { dispatch(killPanel()) }; },[dispatch]);

    return (
        <section className="main g32">
            <PageHeader title={ subtitle } callback={ toggleServicesIsActive } />

            <Table currentPage={services}
                   deleteRowById={deleteRowById}
                   returnRowById={returnRowById}
                   togglePreDeleteById={togglePreDeleteById}
                   turnEditModeById={turnServiceEditModeById} />

            {services.isActive || services.editMode
                ? <Panel currentPage={services}
                         changeTextById={setServiceInputValueById}
                         addTableRow={addNewWorkShop}
                         toggleIsActive={toggleServicesIsActive}
                         changeTableRowById={changeServiceTableRowById} />
                :null}
        </section>
    )
}

export default Services