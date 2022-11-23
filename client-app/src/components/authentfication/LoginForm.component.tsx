import { observer } from "mobx-react-lite";
import { useMobXStore } from "../../app/stores/root.store";

import { ErrorMessage, Form, Formik } from "formik";

import TextInput from "../form/FormTextInput.component";
import { Button, Header, Label } from "semantic-ui-react";

const LoginForm = () => {
    const { userStore } = useMobXStore();

    return (
        <>
            <Formik initialValues={{
                email: '',
                password: '',
                error: null,
            }} onSubmit={(values, { setErrors }) =>
                userStore.login(values).catch(_ =>
                    setErrors({ error: 'Invalid e-mail or password' }))}
            >
                {({ handleSubmit, isSubmitting, errors }) => (
                    <Form className='ui form' onSubmit={handleSubmit}>
                        <Header as='h2' content='Login to Reactivities' color='teal' textAlign='center' />
                        <TextInput name='email' placeholder={'Email'} />
                        <TextInput name='password' placeholder={'Password'} type='password' />
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