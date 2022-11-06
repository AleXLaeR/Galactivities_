import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import {DEFAULT_STATE} from '../../models/activity';
import ActivityDetails from "./ActivityDetails.component";
import {useMobXStore} from "../../app/stores/root.store";
import {observer} from "mobx-react-lite";

const ActivityForm = () => {
    const { activityStore } = useMobXStore();
    const {
        selectedActivity, selectActivity,
        isEditMode,
        isSubmitMode, setSubmitMode,
        onEditClickAction,
        updateActivity, createActivity
    } = activityStore;

    const [activity, setActivity] = useState(selectedActivity ?? DEFAULT_STATE);

    const handleSubmit = async () => {
        setSubmitMode(true);

        if (activity.id) {
            await updateActivity(activity);
        } else {
            await createActivity(activity);
        }

        selectActivity(activity.id);
        setSubmitMode(false);
    }

    const handleInputChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = event.target;
        setActivity({...activity, [name]: value});
    }

    return (
        <>
            {isEditMode && <ActivityDetails activity={activity}/>}
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
                        onClick={onEditClickAction}
                        floated='right'
                        type='button'
                        content='Cancel'
                    />
                </Form>
            </Segment>
        </>
    )
}

export default observer(ActivityForm);