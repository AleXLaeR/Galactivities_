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

    const { activityStore } = useMobXStore();
    const { isSubmitMode, deleteActivity } = activityStore;

    const handleActivityDelete = async (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(e.currentTarget.name);
        await deleteActivity(id);
    }

    return (
        <Segment.Group>
            <Segment style={{display: 'flex', justifyContent: 'space-between', marginBottom: '-1rem'}}>
                <Item.Group>
                    <Item>
                        <Item.Image size='tiny' circular src='/assets/user.png' />
                        <Item.Content>
                            <Item.Header as={Link} to={`${ROUTES.ACTIVITIES.LIST}/${activity.id}`}>
                                {activity.title}
                            </Item.Header>
                            <Item.Description>
                                Hosted by {activity.host?.displayName}
                            </Item.Description>
                            {(activity.isHost || activity.isGoing) && (
                                <Item.Description>
                                    <Label basic color='orange'>
                                        You are {(activity.isHost) ? 'hosting this' : 'going to'} activity
                                    </Label>
                                </Item.Description>
                            )}
                        </Item.Content>
                    </Item>
                </Item.Group>
                    <Item>
                        <Item.Image
                            size='small'
                            rounded
                            style={{width: '200px'}}
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
                />
            </Segment>
        </Segment.Group>
    );
};

export default observer(ActivityItem);