import "react-calendar/dist/Calendar.css";
import "./ActivityFilters.styles.scss";

import { Header } from "semantic-ui-react";
import Calendar from "react-calendar";
import ActivityFilterItem from "./ActivityFilterItem.component";
import ActivitySortItem from "./ActivitySortItem.component";

const ActivityFilters = () => (
    <>
        <ActivityFilterItem />
        <ActivitySortItem />
        <Header/>
        <Calendar/>
        </>
);

export default ActivityFilters;