import React from "react";
import { useDispatch } from 'react-redux';
import { NavLink } from "react-router-dom";

const PageHeader = ({ title, callback, link }) => {
    const dispatch = useDispatch();

    return (
        <div className="page-header flex a-center g16">
            <h1>{ title }</h1>

            {
                (callback && link) && (
                    <NavLink to={link}
                             className="ptb8 plr16 font f20 w300 c-gray1 bg-white1 br20 pointer"
                             onClick={() =>{ dispatch(callback()) }}>
                        Добавить
                    </NavLink>
                )
            }

            {
                (callback && !link) && (
                    <button className="ptb8 plr16 font f20 w300 c-gray1 bg-white1 br20 pointer"
                            onClick={() =>{ dispatch(callback()) }}>
                        Добавить
                    </button>
                )
            }
        </div>
    )
}

export default PageHeader