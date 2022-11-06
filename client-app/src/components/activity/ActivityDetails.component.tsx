import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import {useDispatch, useSelector} from "react-redux";
import {setEditMode} from "../../reducers/state/state.action";
import {setSelectedActivity} from "../../reducers/activity/activity.action";
import {selectIsEditMode} from "../../reducers/state/state.selector";

interface Props {
    activity: Activity;
}

export default function ActivityDetails({ activity }: Props) {
    const dispatch = useDispatch();
    const isEditMode = useSelector(selectIsEditMode);

    const handleFormOpen = () =>
        dispatch(setEditMode(!isEditMode));

    const handleActivityCancel = () => {
        dispatch(setSelectedActivity(undefined));
        dispatch(setEditMode(false));
    }

    return (
        <Card fluid>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`} />
            <Card.Content>
                <Card.Header>{activity.title}</Card.Header>
                <Card.Meta>
                    <span>{activity.date}</span>
                </Card.Meta>
                <Card.Description>
                    {activity.description}
                </Card.Description>
                <Card.Content>
                    {activity.location}, {activity.venue}
                </Card.Content>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths='2'>
                    <Button onClick={handleFormOpen} basic color='blue' content='Edit' />
                    <Button onClick={handleActivityCancel} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}