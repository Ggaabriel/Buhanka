import { useDispatch, useSelector } from "react-redux";
import ActsTable from "./ActsTable";
import { NavLink } from "react-router-dom";
import { addNewAct } from "../../redux/acts/slice";

const Acts = () => {
    const dispatch = useDispatch();
    const acts = useSelector((state) => state.acts);
    const auth = useSelector((state) => state.auth);
    return (
        <section className="main">
            <div className="heading">
                <h1>Акты</h1>

                <NavLink onClick={() =>{ dispatch(addNewAct()) }}
                         to={`/acts/${acts.tableRow.length}`}>
                    <button className="little_btn" >
                        Добавить
                    </button>
                </NavLink>
            </div>
            <div className="main">
                {/* Сюда таблицу */}
                <ActsTable currentPage={acts} />
            </div>
        </section>
    );
};

export default Acts;
