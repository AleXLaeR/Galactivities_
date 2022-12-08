import "react-calendar/dist/Calendar.css";
import "./ReactCalendar.styles.scss";

import { useMobXStore } from "app/stores/root.store";

import Calendar from "react-calendar";
import { Header } from "semantic-ui-react";

import ActivityFilterItem from "./sidebar-items/ActivityFilters.component";
import ActivitySortItem from "./sidebar-items/ActivitySorts.component";

const DashboardSidebar = () => {
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

export default DashboardSidebar;