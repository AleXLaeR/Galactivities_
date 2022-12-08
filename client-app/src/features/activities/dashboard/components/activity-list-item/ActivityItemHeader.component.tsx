import { Link } from "react-router-dom";
import {IMAGE_URIS, ROUTES} from "app/common/contants";
import { Activity } from "models/activities/Activity";

import { Item, Label, Segment } from "semantic-ui-react";

interface Props {
    activity: Activity;
}

const ActivityHeaderStyles = {
    display: 'flex',
    justifyContent: 'space-between',
    marginBottom: '-1rem'
}

const ActivityItemHeader = ({ activity }: Props) => (
    <Segment style={ActivityHeaderStyles}>
        {activity.isCancelled && (
            <Label
                size='medium'
                attached='top'
                color='red'
                content='Cancelled'
                style={{textAlign: 'center'}}
            />
        )}
        <Item.Group>
            <Item>
                <Item.Image
                    style={{marginBottom: '.4rem'}}
                    size='tiny'
                    circular
                    src={activity.host?.imageUri || IMAGE_URIS.USER_DEFAULT}
                />
                <Item.Content>
                    <Item.Header as={Link} to={`${ROUTES.ACTIVITIES.LIST}/${activity.id}`}>
                        {activity.title}
                    </Item.Header>
                    <Item.Description>
                        {'Hosted by '}
                        <Link to={`${ROUTES.PROFILE.BASE}/${activity.host?.username}`}
                              style={{textDecoration: 'underline'}}
                        >
                            {activity.host?.displayName}
                        </Link>
                    </Item.Description>
                    {activity.isHost && (
                        <Item.Description>
                            <Label basic color='orange'>
                                You are hosting this activity
                            </Label>
                        </Item.Description>
                    )}
                    {(activity.isGoing && !activity.isHost) && (
                        <Item.Description>
                            <Label basic color='green'>
                                You are going to this activity
                            </Label>
                        </Item.Description>
                    )}
                </Item.Content>
            </Item>
        </Item.Group>
        <Item style={{width: '40%', marginTop: activity.isCancelled ? '2rem' : '0'}}>
            <Item.Image
                size='small'
                rounded
                floated='right'
                style={{width: '70%'}}
                src={`${IMAGE_URIS.BASE}/${activity.category}.jpg`}
            />
        </Item>
    </Segment>
);

export default ActivityItemHeader;