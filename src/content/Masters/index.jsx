import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AppContext } from "../../app/Contexts";
import { addNewWorkShop, changeTableRowById, deleteRowById, killPanel, returnRowById, setInputValueById, setOptionValueById, toggleIsActive, togglePreDeleteById, turnEditModeById } from '../../redux/masters/slice';
import Panel from '../../components/Panel'
import Table from '../../components/Table';
import PageHeader from "../../components/PageHeader";

const Masters = ({ title, subtitle }) => {
    const { setTitle } = useContext(AppContext);
    const masters = useSelector((state)=> state.masters);
    const workshop = useSelector((state)=> state.workshop);
    const dispatch = useDispatch();

    useEffect(() => setTitle(title), []);
    useEffect(()=> { return () => { dispatch(killPanel()) }; },[dispatch]);

    return (
        <section className="main g32">
            <PageHeader title={ subtitle } callback={ toggleIsActive } />

            <Table currentPage={masters}
                   deleteRowById={deleteRowById}
                   returnRowById={returnRowById}
                   togglePreDeleteById={togglePreDeleteById}
                   turnEditModeById={turnEditModeById} />

            {masters.isActive || masters.editMode
                ? <Panel currentPage={masters}
                         changeTextById={setInputValueById}
                         addTableRow={addNewWorkShop}
                         toggleIsActive={toggleIsActive}
                         changeTableRowById={changeTableRowById}
                         targetInfo={{workshop:workshop}}
                         setOptionValueById={setOptionValueById} />
                : null}
        </section>
    )
}

export default Masters
