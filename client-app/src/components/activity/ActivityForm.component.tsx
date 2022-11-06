import React, { ChangeEvent, useState } from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import {Activity, DEFAULT_STATE} from '../../models/activity';
import agent from "../../api/agent";
import {useDispatch, useSelector} from "react-redux";
import {setEditMode, setSubmitMode} from "../../reducers/state/state.action";
import {setActivities} from "../../reducers/activities/activities.action";
import {selectActivities} from "../../reducers/activities/activities.selector";
import {setSelectedActivity} from "../../reducers/activity/activity.action";
import {generateNextGuid} from "../../utils/guid.utils";
import {selectIsEditMode, selectIsSubmitMode} from "../../reducers/state/state.selector";
import ActivityDetails from "./ActivityDetails.component";

interface Props {
    activity: Activity;
}

export default function ActivityForm({ activity: selectedActivity }: Props) {
    const dispatch = useDispatch();
    const [activity, setActivity] = useState(selectedActivity ?? DEFAULT_STATE);

    const activities = useSelector(selectActivities) as Activity[];

    const isEditMode = useSelector(selectIsEditMode);
    const isSubmitMode = useSelector(selectIsSubmitMode);

    const handleSubmit = async () => {
        dispatch(setSubmitMode(true));

        if (activity.id) {
            await agent.Activities.update(activity);
            dispatch(setActivities([...activities.filter(a => a.id !== activity.id), activity]));
        } else {
            await agent.Activities.create({...activity, id: generateNextGuid()});
            dispatch(setActivities([...activities, activity]));
        }

        dispatch(setSelectedActivity(activity));
        dispatch(setEditMode(false));
        dispatch(setSubmitMode(false));
    }

    function handleInputChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const {name, value} = event.target;
        setActivity({...activity, [name]: value});
    }

    const handleFormClose = () => dispatch(setEditMode(!isEditMode));

    return (
        <>
            {isEditMode && <ActivityDetails activity={activity}/>}
            <Segment clearing>
                <Form onSubmit={handleSubmit} autoComplete='off'>
                    <Form.Input
                        placeholder='Title'
                        value={activity.title}
                        name='title'
                        onChange={handleInputChange}
                    />
                    <Form.TextArea
                        placeholder='Description'
                        value={activity.description}
                        name='description'
                        onChange={handleInputChange}
                    />
                    <Form.Input
                        placeholder='Category'
                        value={activity.category}
                        name='category'
                        onChange={handleInputChange}
                    />
                    <Form.Input
                        type='date'
                        placeholder='Date'
                        value={activity.date}
                        name='date'
                        onChange={handleInputChange}
                    />
                    <Form.Input
                        placeholder='Location'
                        value={activity.location}
                        name='location'
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
                        onClick={handleFormClose}
                        floated='right'
                        type='button'
                        content='Cancel'
                    />
                </Form>
            </Segment>
        </>
    )
}