import { useDispatch, useSelector } from "react-redux";
import s from "./Table.module.css"
import { NavLink} from "react-router-dom";

const Table = ({ currentPage, deleteRowById, returnRowById, togglePreDeleteById, turnEditModeById, toggleFlagById}) => {
    const dispatch = useDispatch();
    const auth = useSelector((state)=> state.auth)

    return (
        <table className={ s.mainTable }>
            {!currentPage.tableHeader.includes(`Действия`) && <caption><h2>Последние акты</h2></caption>}
            <tbody>
                <tr>
                    {currentPage.tableHeader.map((e, i) => {
                        return <th key={i}>{e}</th>
                    })}
                </tr>
                {currentPage.tableRow && currentPage.tableRow.map((elem, i) => {
                    return <tr key={i} className={`${elem.deleted ? s.mainTable__die:""}`}>
                        {currentPage.tableRow && Object.values(elem.element).map((e, i) => {
                            if (currentPage.haveSpares) {  
                                return (
                                    <td key={i}>
                                        <NavLink key={i} to={`/storehouse/spares/${elem.id}`}>
                                            {e}
                                        </NavLink>    
                                    </td>
                                );
                              } else {
                                return (
                                    <td key={i}>
                                        {e}
                                    </td>
                                );
                              }
                            
                        })}

                        {/* Тут 2 тернарника первый проверяет есть ли поле действия а второй если есть то отрисуй кнопки в зависимости удален элемент или нет */}
                        {auth.isAuth && currentPage.tableHeader.includes(`Действия`) ? !elem.deleted ?
                            <td className={s.mainTable__editArea}>
                                <span className="action redact" onClick={()=> dispatch(turnEditModeById(elem.id))}>
                                    Редактировать,
                                </span>
                                
                                <span onClick={()=>dispatch(togglePreDeleteById(elem.id))}>
                                    Удалить открыть окно
                                </span>
                                {elem.preDelete && <div className={s.mainTable__deletedPage}>
                                    <span>Вы точно хотите удалить мастерскую?</span>
                                    <div className="action" onClick={()=>dispatch(deleteRowById(elem.id))}>
                                    Удалить точно
                                </div>
                                </div> }
                            </td>
                            :
                            <td>
                                <span className="action return" onClick={()=>dispatch(returnRowById(elem.id))}>
                                    Восстановить
                                </span>
                            </td>
                            : 
                            null
                        }
                    </tr>

                })}
            </tbody>


        </table>
    )
}

export default Table