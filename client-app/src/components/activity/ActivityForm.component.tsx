import { ChangeEvent, useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

import { DEFAULT_STATE } from '../../models/activity';
import { ROUTES } from "../../utils/contants.utils";

import { generateNextGuid } from "../../utils/guid.utils";

import { useMobXStore } from "../../app/stores/root.store";
import { observer } from "mobx-react-lite";

import { Button, Container, Form, Segment } from 'semantic-ui-react';
import ActivityDetails from "./ActivityDetails.component";

const ActivityForm = () => {
    const { activityStore } = useMobXStore();
    const { isSubmitMode, setSubmitMode, updateActivity, createActivity, fetchActivity } = activityStore;

    const navigate = useNavigate();
    const { id } = useParams<{id: string}>();

    const [activity, setActivity] = useState(DEFAULT_STATE);

    useEffect(() => {
        const loadActivity = async (id?: string) => {
            if (id) {
                const newActivity = await fetchActivity(id);
                setActivity(newActivity!);
            }
        }
        loadActivity(id);
    }, [id, fetchActivity]);

    const handleSubmit = async () => {
        setSubmitMode(true);

        if (activity.id.length === 0) {
            activity.id = generateNextGuid();
            await createActivity(activity);
        } else {
            await updateActivity(activity);
        }

        navigate(`${ROUTES.ACTIVITIES.LIST}/${activity.id}`);
        setSubmitMode(false);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setActivity({...activity, [name]: value});
    }

    return (
        <Container style={{marginTop: '6rem'}}>
            {<ActivityDetails newActivity={activity} />}
            <Segment clearing>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                    <Form.Input
                        placeholder='Title'
                        value={activity.title}
                        name='title'
                        required
                        onChange={handleInputChange}
                    />
                    <Form.TextArea
                        placeholder='Description'
                        value={activity.description}
                        name='description'
                        required
                        onChange={handleInputChange}
                    />
                    <Form.Input
                        placeholder='Category'
                        value={activity.category}
                        name='category'
                        required
                        onChange={handleInputChange}
                    />
                    <Form.Input
                        type='date'
                        placeholder='Date'
                        value={activity.date}
                        name='date'
                        required
                        onChange={handleInputChange}
                    />
                    <Form.Input
                        placeholder='Location'
                        value={activity.location}
                        name='location'
                        required
                        onChange={handleInputChange}
                    />
                    <Form.Input
                        placeholder='Venue'
                        value={activity.venue}
                        name='venue'
                        onChange={handleInputChange}
                    />

                    <Button
                        loading={isSubmitMode}
                        floated='right'
                        positive
                        type='submit'
                        content='Submit'
                    />
                    <Button
                        as={Link}
                        to={ROUTES.ACTIVITIES.LIST}
                        floated='right'
                        type='button'
                        content='Cancel'
                    />
                </Form>
            </Segment>
        </Container>
    );
}

export default observer(ActivityForm);