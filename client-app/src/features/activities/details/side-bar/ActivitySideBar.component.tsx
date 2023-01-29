import { observer } from 'mobx-react-lite';
import { Activity } from "models/activities/Activity";

import { Segment, List, Item } from 'semantic-ui-react';
import ActivitySideBarItem from "./ActivitySideBarItem.component";

interface Props {
    activity: Activity;
}

const MAXIMUM_DISPLAYED_ATTENDEES = 10;

const ActivitySideBar = ({ activity: { attendees, host } }: Props) => (
    <>
        <Segment
            textAlign='center'
            style={{border: 'none'}}
            attached='top'
            secondary
            inverted
            color='teal'
        >
            {attendees!.length} {(attendees!.length === 1) ? 'Person is' : 'People are'} Going
        </Segment>
        <Segment attached>
            <List relaxed divided>
                {attendees!.filter((_, idx) => idx <= MAXIMUM_DISPLAYED_ATTENDEES).map(attendee => (
                    <ActivitySideBarItem
                        key={attendee.username}
                        attendee={attendee}
                        isHost={attendee.username === host?.username}
                    />
                ))}
                {(attendees.length > MAXIMUM_DISPLAYED_ATTENDEES) && (
                    <Item style={{textAlign: 'center', fontSize: '1.3rem'}}>
                        <em>And others...</em>
                    </Item>
                )}
            </List>
        </Segment>
    </>
);

export default observer(ActivitySideBar);