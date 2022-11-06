import { Item, Segment } from 'semantic-ui-react';
import {Activity} from '../../models/activity';
import {useSelector} from "react-redux";
import {selectActivities} from "../../reducers/activities/activities.selector";

import ActivityItem from "./ActivityItem.component";

const ActivityList = () => {
    const activities = useSelector(selectActivities) as Activity[];

    return (
        <Segment>
            <Item.Group divided>
                {activities.map(activity => (
                    <ActivityItem key={activity.id} activity={activity} />
                ))}
            </Item.Group>
        </Segment>
    )
}

export default ActivityList;