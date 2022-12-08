import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { useMobXStore } from "app/stores/root.store";

import { ActivityFormValues } from 'models/activities/Activity';
import { categoryOptions } from "models/activities/Category";
import { DATE_FORMAT, ROUTES } from "app/common/contants";

import * as Yup from 'yup';
import { Form, Formik } from "formik";

import { v4 as uuid } from 'uuid';

import { Button, Divider, Header, Segment }  from 'semantic-ui-react';
import { SelectInput, TextInput,TextArea, DateInput } from "app/common/components/form-inputs";

const ActivityForm = () => {
    const { activityStore } = useMobXStore();
    const { isSubmitMode, setSubmitMode, updateActivity, createActivity, fetchActivity } = activityStore;

    const navigate = useNavigate();
    const { id } = useParams<{id: string}>();

    const [activity, setActivity] = useState<ActivityFormValues>(new ActivityFormValues());

    const validationSchema = Yup.object({
        title: Yup.string().required('The activities title is required'),
        category: Yup.string().required('The activities category is required'),
        date: Yup.date().required('The activities date is required').nullable(),
        location: Yup.string().required('The activities location is required'),
        venue: Yup.string().required('The activities venue is required'),
    });

    useEffect(() => {
        if (id) {
            fetchActivity(id).then(a => setActivity(new ActivityFormValues(a)));
        }
    }, [id, fetchActivity]);

    const handleFormSubmit = async (activity: ActivityFormValues) => {
        setSubmitMode(true);

        if (activity.id) {
            await updateActivity(activity);
        } else {
            activity.id = uuid();
            await createActivity(activity);
        }

        navigate(`${ROUTES.ACTIVITIES.LIST}/${activity.id}`);
        setSubmitMode(false);
    }

    return (
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
                            dateFormat={DATE_FORMAT.FULL_MONTH_DAY_NUMBER}
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
    );
}

export default observer(ActivityForm);