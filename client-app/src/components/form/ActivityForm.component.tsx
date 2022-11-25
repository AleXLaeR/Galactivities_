import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

import { generateNextGuid } from "../../utils/guid.utils";

import { ActivityFormValues } from '../../models/Activity.model';
import { ROUTES } from "../../utils/contants.utils";
import { categoryOptions } from "../../models/Categories.model";

import { useMobXStore } from "../../app/stores/root.store";
import { observer } from "mobx-react-lite";

import {Button, Container, Divider, Header, Segment} from 'semantic-ui-react';

import { Form, Formik } from "formik";
import * as Yup from 'yup';

import TextInput from "./FormTextInput.component";
import TextArea from "./FormTextArea.component";
import SelectInput from "./FormSelectInput.component";
import DateInput from "./FormDateInput.component";

const ActivityForm = () => {
    const { activityStore } = useMobXStore();
    const { isSubmitMode, setSubmitMode, updateActivity, createActivity, fetchActivity } = activityStore;

    const navigate = useNavigate();
    const { id } = useParams<{id: string}>();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        category: Yup.string().required('The activity category is required'),
        date: Yup.date().required('The activity date is required').nullable(),
        location: Yup.string().required('The activity location is required'),
        venue: Yup.string().required('The activity venue is required'),
    });

    useEffect(() => {
        if (id)
            fetchActivity(id).then(a => setActivity(new ActivityFormValues(a)));
    }, [id, fetchActivity]);

    const handleFormSubmit = async (activity: ActivityFormValues) => {
        setSubmitMode(true);

        if (!activity.id) {
            activity.id = generateNextGuid();
            await createActivity(activity);
        } else {
            await updateActivity(activity);
        }

        navigate(`${ROUTES.ACTIVITIES.LIST}/${activity.id}`);
        setSubmitMode(false);
    }

    return (
        <Container style={{marginTop: '6rem'}}>
            <Segment clearing>
                <Header content='Activity Details' sub color='teal' size='large'/>
                <Divider />
                <Formik
                    enableReinitialize
                    validationSchema={validationSchema}
                    initialValues={activity}
                    onSubmit={values => handleFormSubmit(values)}
                >
                    {({ handleSubmit, isValid, isSubmitting, dirty }) => (
                        <Form className='ui form' onSubmit={handleSubmit}>
                            <TextInput name='title' placeholder='Title'/>
                            <TextArea name='description' placeholder='Description'/>
                            <SelectInput name='category' placeholder='Category' options={categoryOptions} />
                            <DateInput
                                placeholderText='Date'
                                name='date'
                                showTimeSelect
                                timeCaption='time'
                                dateFormat='MMMM d, yyyy h:mm aa'
                            />
                            <Header content='Location Details' sub color='teal' size='large'/>
                            <Divider />
                            <TextInput name='location' placeholder='Location'/>
                            <TextInput name='venue' placeholder='Venue'/>
                            <Button
                                disabled={isSubmitting || !dirty || !isValid}
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
                    )}
                </Formik>
            </Segment>
        </Container>
    );
}

export default observer(ActivityForm);