import { SyntheticEvent, useState } from "react";
import { Link } from "react-router-dom";

import { Activity } from "../../../models/Activity.model";
import { ROUTES } from "../../../utils/contants.utils";

import { useMobXStore } from "../../../app/stores/root.store";
import { observer } from "mobx-react-lite";

import { format } from 'date-fns';

import {Button, Icon, Item, Label, Segment} from "semantic-ui-react";
import ActivityAttendees from "./ActivityAttendees.component";

interface Props {
    activity: Activity,
}

const ActivityItem = ({ activity }: Props) => {
    const [target, setTarget] = useState('');

    const { activityStore, userStore: { user } } = useMobXStore();
    const { isSubmitMode, deleteActivity } = activityStore;

    const handleActivityDelete = async (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(e.currentTarget.name);
        await deleteActivity(id);
    }

    return (
        <Segment.Group>
            <Segment style={{display: 'flex', justifyContent: 'space-between', marginBottom: '-1rem'}}>
                {activity.isCancelled && (
                    <Label
                        size='large'
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
                            src={activity.host?.imageUri || '/assets/user.png'}
                        />
                        <Item.Content>
                            <Item.Header as={Link} to={`${ROUTES.ACTIVITIES.LIST}/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>
                                {'Hosted by '}
                                <Link to={`${ROUTES.PROFILE.BASE}/${activity.host?.username}`} style={{textDecoration: 'underline'}}>
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
                            src={`/assets/categoryImages/${activity.category}.jpg`}
                        />
                    </Item>
            </Segment>
            <Segment>
                <span style={{display: 'flex', justifyContent: 'space-between'}}>
                    <div><Icon name='clock'/> {format(activity.date, 'dd MMM yyyy h:mm aa')}</div>
                    <div><Icon name='marker'/> {activity.venue}, {activity.location}</div>
                </span>
            </Segment>
            <Segment secondary compact>
                <ActivityAttendees attendees={activity.attendees!} />
            </Segment>
            <Segment clearing>
                <span>{activity.description}</span>
                <Button
                    as={Link}
                    to={`${ROUTES.ACTIVITIES.LIST}/${activity.id}`}
                    color='teal'
                    floated='right'
                    content='View'
                />
                    <Button
                        name={activity.id}
                        loading={isSubmitMode && target === activity.id}
                        onClick={(e) => handleActivityDelete(e, activity.id)}
                        color='red'
                        floated='right'
                        content='Delete'
                        disabled={activity.hostUsername === user?.username}
                    />
            </Segment>
        </Segment.Group>
    );
};

export default observer(ActivityItem);