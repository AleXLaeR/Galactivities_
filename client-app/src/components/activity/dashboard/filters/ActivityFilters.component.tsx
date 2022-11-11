import "react-calendar/dist/Calendar.css";
import "./ActivityFilters.styles.scss";

import { Header, Menu } from "semantic-ui-react";
import Calendar from "react-calendar";

const FilterHeaderStyles = {
    borderRadius: '6px',
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
}

const ActivityFilters = () => (
    <>
        <Menu vertical size='large' fluid style={{marginTop: '2rem'}} >
            <Header
                dividing
                attached
                color='teal'
                icon='filter'
                content='Filters'
                style={FilterHeaderStyles}
            />
            <Menu.Item content='All' className='filter-title' />
            <Menu.Item content="I'm going" className='filter-title' />
            <Menu.Item content="I'm hosting" className='filter-title' />
        </Menu>
        <Header />
        <Calendar />
    </>
);

export default ActivityFilters