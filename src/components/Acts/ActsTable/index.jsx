import s from "./Table.module.css";
import { NavLink } from "react-router-dom";

const ActsTable = ({ currentPage }) => {
    return (
        <table className={ s.mainTable }>
            <tbody>
                <tr>
                    {currentPage.tableHeader.map((e, i) => {
                        return <th key={i}>{e}</th>;
                    })}
                </tr>
                {currentPage.tableRow &&
                    currentPage.tableRow.map((elem, i) => {
                        return (
                            <tr
                                key={i}
                                className={`${
                                    elem.deleted ? s.mainTable__die : ""
                                }`}
                            >
                                {currentPage.tableRow &&
                                    Object.values(elem.element).map((e, i) => {
                                        return (
                                            <td key={i}>
                                                <NavLink 
                                                to={`/acts/${elem.id}`}>
                                                    {e}
                                                </NavLink>
                                            </td>
                                        );
                                    })}
                            </tr>
                        );
                    })}
            </tbody>
        </table>
    );
};

export default ActsTable;
