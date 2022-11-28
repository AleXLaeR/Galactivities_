import {Header, Menu} from "semantic-ui-react";

import './ActivityFilters.styles.scss';
import {useState} from "react";
import {useMobXStore} from "../../../../app/stores/root.store";

interface Props {
    header: string;
    iconName?: string;
    filterTitles: string[];
}

const FilterHeaderStyles = {
    borderRadius: '6px',
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
}

const ActivityFilterItem = ({ filterTitles, header, iconName }: Props) => {
    const [activeTab, setActiveTab] = useState(0);

    const { activityStore } = useMobXStore();
    const { activitiesByDate } = activityStore;

    return (
        <Menu vertical size="large" fluid style={{marginTop: "2rem"}}>
            <Header
                dividing
                attached
                color="teal"
                icon={iconName}
                content={header}
                style={FilterHeaderStyles}
            />
            {filterTitles.map((title, idx) => (
                <Menu.Item
                    key={title}
                    content={title}
                    className="filter-title"
                    icon={(activeTab === idx) ? "checkmark" : null}
                    onClick={() => {}}
                />
            ))}
        </Menu>
    );
}

export default ActivityFilterItem;