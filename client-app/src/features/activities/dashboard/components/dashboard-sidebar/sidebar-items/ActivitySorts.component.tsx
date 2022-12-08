import { observer } from "mobx-react-lite";
import { useMobXStore } from "app/stores/root.store";

import { Header, Menu } from "semantic-ui-react";

const FilterHeaderStyles = {
    borderRadius: '6px',
    borderBottomLeftRadius: '0',
    borderBottomRightRadius: '0',
}

const sortingMap: Map<string, string> = new Map()
    .set('Most Recent', 'date')
    .set('Most Popular', 'popularityDescending')
    .set('Most Discussed', 'relevancyDescending');

const ActivitySorts = () => {
    const { activityStore } = useMobXStore();
    const { sorting, setSorting } = activityStore;

    return (
        <Menu vertical size="large" fluid style={{marginTop: "2rem"}}>
        <Header
            dividing
            attached
            color='teal'
            icon='compass'
            content='Sort By'
            style={FilterHeaderStyles}
        />
        {Array.from(sortingMap.keys()).map(key => (
            <Menu.Item
                key={key}
                content={key}
                active={sorting === sortingMap.get(key)}
                style={{cursor: 'pointer', backgroundColor: '#a4a1a1 !important'}}
                icon={(sorting === sortingMap.get(key)) ? "checkmark" : null}
                onClick={() => setSorting(sortingMap.get(key)!)}
            />
        ))}
        </Menu>
    );
}

export default observer(ActivitySorts);