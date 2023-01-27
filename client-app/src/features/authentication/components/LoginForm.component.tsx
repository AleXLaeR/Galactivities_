import { observer } from "mobx-react-lite";
import { useMobXStore } from "app/stores/root.store";

import { APP_NAME } from "app/common/contants";
import { ErrorMessage, Form, Formik } from "formik";

import { Button, Header } from "semantic-ui-react";
import TextInput from "app/common/components/form-inputs/components/FormTextInput.component";
import { ValidationErrorList } from "features/errors";

const LoginForm = () => {
    const { userStore: { login } } = useMobXStore();

    return (
        <>
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                    error: null,
                }}
                onSubmit={(values, { setErrors }) =>
                    login(values).catch(_ => setErrors({ error: 'Invalid e-mail or password' }))
                }
            >
                {({ handleSubmit, isSubmitting, errors }) => (
                    <Form className='ui form error' onSubmit={handleSubmit}>
                        <Header
                            as='h2'
                            content={`Login to ${APP_NAME}`}
                            color='teal'
                            textAlign='center'
                        />
                        <TextInput name='email' placeholder='Email' />
                        <TextInput name='password' placeholder='Password' type='password' />
                        <ErrorMessage
                            name='error'
                            render={() => (
                                <ValidationErrorList errors={errors.error} />
                            )}
                        />
                        <Button
                            fluid
                            positive
                            content='Login'
                            type='submit'
                            loading={isSubmitting}
                        />
                    </Form>
                )}
            </Formik>
        </>
    );
};

export default observer(LoginForm);