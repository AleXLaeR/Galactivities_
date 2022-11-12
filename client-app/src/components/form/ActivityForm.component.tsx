import { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";

import { DEFAULT_STATE } from '../../models/Activity.model';
import { ROUTES } from "../../utils/contants.utils";
import { categoryOptions } from "../../models/Categories.model";

import { useMobXStore } from "../../app/stores/root.store";
import { observer } from "mobx-react-lite";

import { Button, Container, Segment } from 'semantic-ui-react';

import { Form, Formik } from "formik";
import * as Yup from 'yup';

import TextInput from "./FormTextInput.component";
import TextArea from "./FormTextArea.component";
import SelectInput from "./FormSelectInput.component";
import DateInput from "./FormDateInput.component";

const ActivityForm = () => {
    const { activityStore } = useMobXStore();
    const { isSubmitMode, fetchActivity } = activityStore;

    const { id } = useParams<{id: string}>();

    const [activity, setActivity] = useState(DEFAULT_STATE);

    const validationSchema = Yup.object({
        title: Yup.string().required('The activity title is required'),
        description: Yup.string().required('The activity description is required'),
        category: Yup.string().required('The activity category is required'),
        date: Yup.date().required('The activity date is required'),
        location: Yup.string().required('The activity location is required'),
        venue: Yup.string().required('The activity venue is required'),
    });

    useEffect(() => {
        if (id)
            fetchActivity(id).then(act => setActivity(act!));
    }, [id, fetchActivity]);

    return (
        <Container style={{marginTop: '6rem'}}>
            <Segment clearing>
                <Formik
                    enableReinitialize
                    validationSchema={validationSchema}
                    initialValues={activity}
                    onSubmit={values => console.log(values)}
                >
                    {({ handleSubmit }) => (
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
                            <TextInput name='location' placeholder='Location'/>
                            <TextInput name='venue' placeholder='Venue'/>
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
                    )}
                </Formik>
            </Segment>
        </Container>
    );
}

export default observer(ActivityForm);