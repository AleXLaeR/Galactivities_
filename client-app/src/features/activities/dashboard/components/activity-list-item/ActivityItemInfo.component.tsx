import { format } from "date-fns";

import { Activity } from "models/activities/Activity";
import { DATE_FORMAT } from "app/common/contants";

import { Icon, Segment }  from "semantic-ui-react";

interface Props {
    activity: Activity;
}

const ActivityItemInfo = ({ activity }: Props) => (
    <Segment>
        <span style={{display: 'flex', justifyContent: 'space-between'}}>
            <div>
                <Icon name='clock'/>
                {format(activity.date, DATE_FORMAT.TIME_ABBR_LOWERCASE)}
            </div>
            <div>
                <Icon name='map marker alternate'/>
                {activity.venue}, {activity.location}
            </div>
        </span>
    </Segment>
);

export default ActivityItemInfo;