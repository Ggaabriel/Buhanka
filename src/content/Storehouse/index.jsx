import React, {useContext, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewWorkShop, changeTableRowById, deleteRowById, killPanel, returnRowById, setInputValueById, toggleIsActive, togglePreDeleteById, turnEditModeById } from '../../redux/storehouse/slice';
import { AppContext } from "../../app/Contexts";
import Panel from '../../components/Panel'
import Table from '../../components/Table';
import PageHeader from "../../components/PageHeader";

const Storehouse = ({ title, subtitle }) => {
    const { setTitle } = useContext(AppContext);
    const storehouse = useSelector((state)=> state.storehouse);
    const dispatch = useDispatch();

    useEffect(() => setTitle(title), []);
    useEffect(()=> { return () => { dispatch(killPanel()) }; },[dispatch]);

    return (
        <section className="main g32">
            <PageHeader title={ subtitle } callback={ toggleIsActive } />

            <Table currentPage={storehouse}
                   deleteRowById={deleteRowById}
                   returnRowById={returnRowById}
                   togglePreDeleteById={togglePreDeleteById}
                   turnEditModeById={turnEditModeById} />

            {storehouse.isActive || storehouse.editMode
                ? <Panel currentPage={storehouse}
                         changeTextById={setInputValueById}
                         addTableRow={addNewWorkShop}
                         toggleIsActive={toggleIsActive}
                         changeTableRowById={changeTableRowById} />
                : null}
        </section>
    )
}

export default Storehouse

