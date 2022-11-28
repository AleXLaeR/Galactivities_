import "react-calendar/dist/Calendar.css";
import "./ActivityFilters.styles.scss";

import { Header } from "semantic-ui-react";
import Calendar from "react-calendar";
import ActivityFilterItem from "./ActivityFilterItem.component";

const ActivityFilters = () => (
    <>
        <ActivityFilterItem
            header="Filter By"
            iconName="filter"
            filterTitles={["All", "I'm going", "I'm hosting"]}
        />
        <ActivityFilterItem
            header="Sort By"
            iconName="compass"
            filterTitles={["Most Recent", "Most Popular", "Most Discussed"]}
        />
        <Header />
        <Calendar />
    </>
);

export default ActivityFilters