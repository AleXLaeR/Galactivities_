import { observer } from "mobx-react-lite";
import { useMobXStore } from "app/stores/root.store";

import { Header, Menu } from "semantic-ui-react";
import { FilterType } from 'app/stores/activity.store';

const FilterHeaderStyles = {
    borderRadius: '6px',
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
}

const sortingMap: Map<string, FilterType> = new Map()
    .set('All', 'all')
    .set('I\'m going', 'isGoing')
    .set('I\'m hosting', 'isHost');

const ActivityFilters = () => {
    const { activityStore } = useMobXStore();
    const { activityFilter, setFilter } = activityStore;

    const handleClick = (filterKey: string) => {
        const filter = sortingMap.get(filterKey)!;

        if (!activityFilter.has(filter)) {
            setFilter(filter, true);
        }
    }

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
                    active={activityFilter.has(sortingMap.get(key))}
                    className="filter-title"
                    style={{cursor: 'pointer', backgroundColor: '#a4a1a1 !important'}}
                    icon={activityFilter.has(sortingMap.get(key)) ? "checkmark" : null}
                    onClick={() => handleClick(key)}
                />
            ))}
        </Menu>
    );
}

export default observer(ActivityFilters);