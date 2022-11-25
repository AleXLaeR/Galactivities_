import { observer } from 'mobx-react-lite';
import { Link } from 'react-router-dom';

import { Activity } from "../../../models/Activity.model";

import { Segment, List, Label, Item, Image } from 'semantic-ui-react';

interface Props {
    activity: Activity;
}

const ActivityDetailedSideBar = ({ activity: { attendees, host } }: Props) => (
    <>
        <Segment
            textAlign='center'
            style={{ border: 'none' }}
            attached='top'
            secondary
            inverted
            color='teal'
        >
            {attendees!.length} {attendees!.length === 1 ? 'Person' : 'People'} Going
        </Segment>
        <Segment attached>
            <List relaxed divided>
                {attendees!.map(attendee => (
                    <Item key={attendee.username} style={{ position: 'relative' }}>
                        {(attendee.username === host?.username) && (
                            <Label
                                style={{ position: 'absolute' }}
                                color='orange'
                                ribbon='right'
                            >
                                Host
                            </Label>
                        )}
                        <Image size='tiny' src={attendee.imageUri || '/assets/user.png'} />
                        <Item.Content verticalAlign='middle'>
                            <Item.Header as='h3'>
                                <Link to={`profiles/${attendee.username}`}>
                                    {attendee.displayName}
                                </Link>
                            </Item.Header>
                            <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </List>
        </Segment>
    </>
);

export default observer(ActivityDetailedSideBar);