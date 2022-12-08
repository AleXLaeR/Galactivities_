import { Activity } from "models/activities/Activity";

import { Segment } from "semantic-ui-react";
import ActivityAttendees from "./ActivityAttendees.component";
import ActivityItemFooter from "./ActivityItemFooter.component";
import ActivityItemHeader from "./ActivityItemHeader.component";
import ActivityItemInfo from "./ActivityItemInfo.component";

interface Props {
    activity: Activity;
}

const ActivityItem = ({ activity }: Props) => (
    <Segment.Group>
        <ActivityItemHeader activity={activity} />
        <ActivityItemInfo activity={activity} />
        <ActivityAttendees attendees={activity.attendees} />
        <ActivityItemFooter activity={activity} />
    </Segment.Group>
);

export default ActivityItem;