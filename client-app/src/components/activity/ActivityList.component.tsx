import { useMobXStore } from "../../app/stores/root.store";
import { observer } from "mobx-react-lite";

import { Item, Segment } from 'semantic-ui-react';
import ActivityItem from "./ActivityItem.component";

const ActivityList = () => {
    const { activityStore } = useMobXStore();

    return (
        <Segment>
            <Item.Group divided>
                {activityStore.getActivitiesByDate().map(activity => (
                    <ActivityItem key={activity.id} activity={activity} />
                ))}
            </Item.Group>
        </Segment>
    )
}

export default observer(ActivityList);