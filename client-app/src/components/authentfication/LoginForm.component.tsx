import { Form, Formik } from "formik";
import TextInput from "../form/FormTextInput.component";
import { Button, Container } from "semantic-ui-react";

const LoginForm = () => (
    <Container style={{marginTop: '6rem'}}>
        <Formik initialValues={{
            email: '',
            password: ''
        }} onSubmit={values => console.log(values)}>
            {({ handleSubmit }) => (
                <Form className='ui form' onSubmit={handleSubmit}>
                    <TextInput name='email' placeholder={'Email'}/>
                    <TextInput name='password' placeholder={'Password'} type='password'/>
                    <Button fluid positive content='Login' type='submit'/>
                </Form>
            )}
        </Formik>
    </Container>
);

export default LoginForm;