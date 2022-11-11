import { observer } from 'mobx-react-lite';
import { Activity } from "../../../models/Activity.model";

import { Segment, Grid, Icon } from 'semantic-ui-react';

interface Props {
    activity: Activity
}

const ActivityDetailedInfo = ({ activity }: Props) => (
    <Segment.Group>
        <Segment attached='top'>
            <Grid>
                <Grid.Column width={1}>
                    <Icon size='large' color='teal' name='info'/>
                </Grid.Column>
                <Grid.Column width={15}>
                    <p>{activity.description}</p>
                </Grid.Column>
            </Grid>
        </Segment>
        <Segment attached>
            <Grid verticalAlign='middle'>
                <Grid.Column width={1}>
                    <Icon name='calendar' size='large' color='teal'/>
                </Grid.Column>
                <Grid.Column width={15}>
            <span>
              {activity.date}
            </span>
                </Grid.Column>
            </Grid>
        </Segment>
        <Segment attached>
            <Grid verticalAlign='middle'>
                <Grid.Column width={1}>
                    <Icon name='marker' size='large' color='teal'/>
                </Grid.Column>
                <Grid.Column width={11}>
                    <span>{activity.venue}, {activity.location}</span>
                </Grid.Column>
            </Grid>
        </Segment>
    </Segment.Group>
);

export default observer(ActivityDetailedInfo);