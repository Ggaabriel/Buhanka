import React, { useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from "../../app/Contexts";
import { addNewWorkShop, changeTableRowById, deleteRowById, killPanel, returnRowById, setInputValueById, toggleIsActive, togglePreDeleteById, turnEditModeById } from '../../redux/workshop/slice';
import Panel from '../../components/Panel'
import Table from '../../components/Table';
import PageHeader from "../../components/PageHeader";

const Workshops = ({ title, subtitle }) => {
    const { setTitle } = useContext(AppContext);
    const workshop = useSelector((state)=> state.workshop);
    const dispatch = useDispatch();

    useEffect(() => setTitle(title), []);
    useEffect(()=> { return () => { dispatch(killPanel()) }; },[dispatch]);

    return (
        <section className="main g32">
            <PageHeader title={ subtitle } callback={ toggleIsActive } />

            <Table currentPage={workshop}
                   deleteRowById={deleteRowById}
                   returnRowById={returnRowById}
                   togglePreDeleteById={togglePreDeleteById}
                   turnEditModeById={turnEditModeById} />

            {workshop.isActive || workshop.editMode
                ? <Panel currentPage={workshop}
                         changeTextById={setInputValueById}
                         addTableRow={addNewWorkShop}
                         toggleIsActive={toggleIsActive}
                         changeTableRowById={changeTableRowById} />
                : null}
        </section>
    )
}

export default Workshops