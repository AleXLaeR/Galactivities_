import { observer } from "mobx-react-lite";
import { useMobXStore } from "../../app/stores/root.store";

import { ErrorMessage, Form, Formik } from "formik";

import * as Yup from "yup";

import TextInput from "../form/FormTextInput.component";
import { Button, Header, Label } from "semantic-ui-react";

const RegisterForm = () => {
    const { userStore } = useMobXStore();

    return (
        <>
            <Formik initialValues={{
                displayName: '',
                username: '',
                email: '',
                password: '',
                error: null,
            }} onSubmit={(values, { setErrors }) =>
                userStore.register(values).catch(_ =>
                    setErrors({ error: 'Invalid e-mail or password' }))}
                validationSchema={Yup.object({
                    displayName: Yup.string().required(),
                    username: Yup.string().required(),
                    email: Yup.string().required().email(),
                    password: Yup.string().matches(
                        new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$'),
                        'Password should contain at least 1 digit, one uppercase and lowercase letters'
                    ),
                })}
            >
                {({ handleSubmit, isSubmitting, errors ,isValid, dirty }) => (
                    <Form className='ui form' onSubmit={handleSubmit}>
                        <Header as='h2' content='Sign Up to Reactivities' color='teal' textAlign='center' />
                        <TextInput name='displayName' placeholder='Display Name' />
                        <TextInput name='username' placeholder='User Name' />
                        <TextInput name='email' placeholder='Email' />
                        <TextInput name='password' placeholder='Password' type='password' />
                        <ErrorMessage name='error' render={() => (
                            <Label
                                style={{marginBottom: '.7rem'}}
                                basic
                                color='red'
                                content={errors.error}
                            />)
                        }
                        />
                        <Button
                            fluid
                            positive
                            content='Register'
                            type='submit'
                            disabled={!isValid || !dirty || !isSubmitting}
                            loading={isSubmitting}
                        />
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default observer(RegisterForm);