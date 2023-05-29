import { useSelector } from "react-redux";
import PageHeader from "../../components/PageHeader";
import ActsTable from "../../components/Acts/ActsTable";
import { addNewAct } from "../../redux/acts/slice";
import { useContext, useEffect } from "react";
import { AppContext } from "../../app/Contexts";

const Acts = ({ title, subtitle }) => {
    const { setTitle } = useContext(AppContext);
    const acts = useSelector((state) => state.acts);

    useEffect(() => setTitle(title), []);

    return (
        <main className="main g32">
            <PageHeader title={ subtitle } callback={ addNewAct } link="/acts/0" />

            <ActsTable currentPage={acts} />
        </main>
    );
};

export default Acts;
