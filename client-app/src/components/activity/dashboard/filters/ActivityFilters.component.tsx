import "react-calendar/dist/Calendar.css";
import "./ActivityFilters.styles.scss";

import { Header } from "semantic-ui-react";
import Calendar from "react-calendar";
import ActivityFilterItem from "./ActivityFilterItem.component";
import ActivitySortItem from "./ActivitySortItem.component";
import {useMobXStore} from "../../../../app/stores/root.store";

const ActivityFilters = () => {
    const { activityStore } = useMobXStore();
    const { filter, setFilter } = activityStore;

    return (
        <>
            <ActivityFilterItem />
            <ActivitySortItem />
            <Header />
            <Calendar
                onClickDay={date => setFilter('startDate', date as Date)}
                value={filter.get('startDate') || new Date()}
            />
        </>
    );
};

export default ActivityFilters;