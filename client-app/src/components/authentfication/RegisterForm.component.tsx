import { observer } from "mobx-react-lite";
import { useMobXStore } from "../../app/stores/root.store";

import { ErrorMessage, Form, Formik } from "formik";

import * as Yup from "yup";

import TextInput from "../form/FormTextInput.component";
import { Button, Header } from "semantic-ui-react";
import ValidationErrorList from "../errors/ValidationErrorList.component";

const RegisterForm = () => {
    const { userStore } = useMobXStore();

    const validationSchema = Yup.object({
        displayName: Yup.string().required(),
        username: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().required(),
    });

    return (
        <>
            <Formik initialValues={{
                displayName: '',
                username: '',
                email: '',
                password: '',
                error: null,
            }} onSubmit={(values, { setErrors }) =>
                userStore.register(values).catch(error => setErrors({ error }))}
               validationSchema={validationSchema}
            >
                {({ handleSubmit, isSubmitting, errors, isValid, dirty }) => (
                    <Form className='ui form error' onSubmit={handleSubmit}>
                        <Header as='h2' content='Sign Up to Reactivities' color='teal' textAlign='center' />
                        <TextInput name='displayName' placeholder='Display Name' />
                        <TextInput name='username' placeholder='User Name' />
                        <TextInput name='email' placeholder='Email' />
                        <TextInput name='password' placeholder='Password' type='password' />
                        <ErrorMessage name='error' render={() => (
                            <ValidationErrorList errors={errors.error} />)
                        }
                        />
                        <Button
                            fluid
                            positive
                            content='Register'
                            type='submit'
                            disabled={!isValid || !dirty || isSubmitting}
                            loading={isSubmitting}
                        />
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default observer(RegisterForm);