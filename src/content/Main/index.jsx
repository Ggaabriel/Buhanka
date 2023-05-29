import s from "./Main.module.css"
import ActsTable from '../../components/Acts/ActsTable'
import { useSelector } from 'react-redux';
import { useContext, useEffect } from "react";
import { AppContext } from "../../app/Contexts";
import PageHeader from "../../components/PageHeader";

const Main = ({ title, subtitle }) => {
    const { setTitle } = useContext(AppContext);
    const acts = useSelector((state)=> state.acts);

    useEffect(() => setTitle(title), []);

    return (
        <section className="main g32">
            <PageHeader title={ subtitle } />

            <div className={ s.statistics }>
                <div className={ [s.item, s.more].join(" ") }>
                    <p className={ s.item__count }>12</p>
                    <p className={ s.item__title }>Актов заполнено сегодня</p>
                </div>

                <div className={ [s.item, s.less].join(" ") }>
                    <p className={ s.item__count }>12</p>
                    <p className={ s.item__title }>Актов заполнено <br/>за месяц</p>
                </div>

                <div className={ [s.item, s.more].join(" ") }>
                    <p className={ s.item__count }>124</p>
                    <p className={ s.item__title }>Новых клиентов <br/>за месяц</p>
                </div>
            </div>

            <ActsTable currentPage={acts} />
        </section>
    )
}

export default Main