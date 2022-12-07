import { observer } from "mobx-react-lite";
import { useMobXStore } from "app/stores/root.store";

import { Header, Menu } from "semantic-ui-react";

const FilterHeaderStyles = {
    borderRadius: '6px',
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
}

const sortingMap: Map<string, string> = new Map()
    .set('All', 'all')
    .set('I\'m going', 'isGoing')
    .set('I\'m hosting', 'isHost');

const ActivityFilters = () => {
    const { activityStore } = useMobXStore();
    const { filter, setFilter } = activityStore;

    return (
        <Menu vertical size="large" fluid style={{marginTop: "2rem"}}>
            <Header
                dividing
                attached
                color="teal"
                icon='filter'
                content='Filter By'
                style={FilterHeaderStyles}
            />
            {Array.from(sortingMap.keys()).map(key => (
                <Menu.Item
                    key={key}
                    content={key}
                    active={filter.has(sortingMap.get(key))}
                    className="filter-title"
                    style={{cursor: 'pointer', backgroundColor: '#a4a1a1 !important'}}
                    icon={filter.has(sortingMap.get(key)) ? "checkmark" : null}
                    onClick={() => setFilter(sortingMap.get(key)!, true)}
                />
            ))}
        </Menu>
    );
}

export default observer(ActivityFilters);