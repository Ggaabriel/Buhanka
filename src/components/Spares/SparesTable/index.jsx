import { useDispatch, useSelector } from "react-redux";
import s from "../../Table/Table.module.css"
import {useLocation } from "react-router-dom";

const SparesTable = ({ currentPage, deleteRowById, returnRowById, togglePreDeleteById, turnEditModeById, toggleFlagById}) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const auth = useSelector((state)=> state.auth)

    return (
        <table className={`${s.mainTable} mt50`}>
            { !currentPage.tableHeader.includes(`Действия`) && <caption><h2>Последние акты</h2></caption>}
            <tbody>
                <tr>
                    {currentPage.tableHeader.map((e, i) => {
                        return <th key={i}>{e}</th>
                    })}
                </tr>
                {currentPage.tableRow && currentPage.tableRow.map((elem, i) => {
                    return <tr key={i} className={`${elem.deleted ? s.mainTable__die:""}`}>
                        {currentPage.tableRow && Object.values(elem.element).map((e, i) => {
                                return (
                                    +location.pathname[location.pathname.length - 1] === elem.storehouseId &&
                                    <td key={i} >
                                        {Array.isArray(e) ? elem.flag ? (
                                        <>
                                            <table className={`${s.mainTable} `} onClick={()=> dispatch(toggleFlagById(elem.id))}>
                                                <tbody className={ `${s.mainTable__compVehicles}`}>
                                                    <tr>
                                                        <th>Марка</th>
                                                        <th>Модель</th>
                                                        <th>Год</th>
                                                    </tr>
                                                    {e.map((elemento, index) => (
                                                    <tr key={index}>
                                                        {Object.values(elemento).map((elemumulelentonto, i) => (
                                                        <td key={i} className={s.mainTable__autoList}>
                                                            {elemumulelentonto}
                                                        </td>
                                                        ))}
                                                    </tr>
                                                    ))}
                                                </tbody>
                                            </table>


                                        </> 
                                        )
                                        : 
                                            <div onClick={()=> dispatch(toggleFlagById(elem.id))}>Показать таблицу↓</div> 
                                        : (
                                            <div>{e}</div>
                                        )}

                                    </td>

                                  );
                              
                            
                        })}

                        {/* Тут 2 тернарника первый проверяет есть ли поле действия а второй если есть то отрисуй кнопки в зависимости удален элемент или нет */}
                        {auth.isAuth && +location.pathname[location.pathname.length - 1] === elem.storehouseId && currentPage.tableHeader.includes(`Действия`) ? !elem.deleted ?
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

export default SparesTable