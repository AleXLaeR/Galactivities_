import {Header, Menu} from "semantic-ui-react";

import './ActivityFilters.styles.scss';

import {useMobXStore} from "../../../../app/stores/root.store";
import {observer} from "mobx-react-lite";

const FilterHeaderStyles = {
    borderRadius: '6px',
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
}

const sortingMap: Map<string, string> = new Map()
    .set('All', 'all')
    .set('I\'m going', 'isGoing')
    .set('I\'m hosting', 'isHosting');

const ActivityFilterItem = () => {
    const { activityStore } = useMobXStore();
    const { filter, setFilter } = activityStore;

    const handleFilterSelect = (tabIdx: number, key: string) => {
        setFilter(key, 'true');
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
            {Array.from(sortingMap.keys()).map((key, idx) => (
                <Menu.Item
                    key={key}
                    content={key}
                    active={filter.has(sortingMap.get(key))}
                    className="filter-title"
                    icon={filter.has(sortingMap.get(key)) ? "checkmark" : null}
                    onClick={() => handleFilterSelect(idx, sortingMap.get(key)!)}
                />
            ))}
        </Menu>
    );
}

export default observer(ActivityFilterItem);