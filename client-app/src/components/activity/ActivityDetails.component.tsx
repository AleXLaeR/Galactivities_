import React from 'react';
import { Button, Card, Image } from 'semantic-ui-react';
import { Activity } from '../../models/activity';
import {useMobXStore} from "../../app/stores/root.store";
import {observer} from "mobx-react-lite";

interface Props {
    activity: Activity;
}

const ActivityDetails = ({ activity }: Props) => {
    const { activityStore } = useMobXStore();
    const { onEditClickAction, onActivitySelect } = activityStore;

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
                    <Button onClick={onEditClickAction} basic color='blue' content='Edit' />
                    <Button onClick={() => onActivitySelect()} basic color='grey' content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default observer(ActivityDetails);