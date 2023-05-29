import React, { useContext, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNewWorkShop, changeTableRowById, deleteRowById, killPanel, returnRowById, setCarCountById, setInputValueById, toggleIsActive, togglePreDeleteById, turnEditModeById } from '../../redux/clients/slice';
import { AppContext } from "../../app/Contexts";
import Panel from '../../components/Panel'
import Table from '../../components/Table';
import PageHeader from "../../components/PageHeader";

const Clients = ({ title, subtitle }) => {
    const { setTitle } = useContext(AppContext);
    const clients = useSelector((state)=> state.clients);
    const vehicles = useSelector((state)=> state.vehicles);
    const auth = useSelector((state)=> state.auth);
    const dispatch = useDispatch();

    useEffect(() => setTitle(title), []);
    useEffect(() => { return () => dispatch(killPanel()); },[dispatch]);

    // Снизу считаются и заполняются транспортные средства
    useEffect(()=>{
        clients.tableRow.forEach((elem)=>{
            let carCount = vehicles.tableRow.reduce((accum,e)=>{
                if(elem.element.name === e.element.owner){
                    return accum + 1;
                }
                return accum;
            },0)
            dispatch(setCarCountById({id:elem.id, carCount:carCount}))
        })
    },[vehicles.tableRow, dispatch, clients.tableRow])

    return (
        <section className="main g32">
            <PageHeader title={ subtitle } callback={ toggleIsActive } />

           <Table currentPage={clients}
                  deleteRowById={deleteRowById}
                  returnRowById={returnRowById}
                  togglePreDeleteById={togglePreDeleteById}
                  turnEditModeById={turnEditModeById} />

            {clients.isActive || clients.editMode
                ? <Panel currentPage={clients}
                         changeTextById={setInputValueById}
                         addTableRow={addNewWorkShop}
                         toggleIsActive={toggleIsActive}
                         changeTableRowById={changeTableRowById} />
                : null}
        </section>
    )
}

export default Clients