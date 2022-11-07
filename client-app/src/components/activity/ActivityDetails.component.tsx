import { useEffect } from 'react';
import { Link, useParams } from "react-router-dom";

import { ROUTES } from "../../utils/contants.utils";
import { Activity } from '../../models/activity';

import { useMobXStore } from "../../app/stores/root.store";
import { observer } from "mobx-react-lite";

import { Button, Card, Container, Image } from 'semantic-ui-react';
import Spinner from "../Spinner.component.";

interface Props {
    newActivity?: Activity;
}

const ActivityDetails = ({ newActivity }: Props) => {
    const { activityStore } = useMobXStore();
    let { selectedActivity: activity, fetchActivity, isLoadingInitial } = activityStore;

    const { id } = useParams<{id: string}>();

    if (newActivity) {
        activity = newActivity;
    }

    useEffect(() => {
        const loadActivity = async (id?: string) => {
            if (id) {
                await fetchActivity(id);
            }
        }
        loadActivity(id);
    }, [id, fetchActivity]);

    if (isLoadingInitial || !activity)
        return <Spinner content='Loading activity...' />;

    return (
        <Container style={{marginTop: '6rem'}}>
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
                        <Button as={Link} to={`${ROUTES.CRUD.EDIT}/${activity.id}`} basic color='blue' content='Edit' />
                        <Button as={Link} to={ROUTES.ACTIVITIES.LIST} basic color='grey' content='Cancel' />
                    </Button.Group>
                </Card.Content>
            </Card>
        </Container>
    );
}

export default observer(ActivityDetails);