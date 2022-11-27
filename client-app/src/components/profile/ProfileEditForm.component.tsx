import { useMobXStore } from "../../app/stores/root.store";

import { Formik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "semantic-ui-react";
import TextInput from "../form/FormTextInput.component";
import TextArea from "../form/FormTextArea.component";
import { observer } from "mobx-react-lite";
import {UserProfile} from "../../models/UserProfile.model";

interface Props {
    setEditMode: (value: boolean) => void;
}


const ProfileEditForm = ({ setEditMode }: Props) => {
    const { profileStore } = useMobXStore();
    const { profile, updateProfile } = profileStore;

   const validationSchema = Yup.object({
       displayName: Yup.string().required()
   })

    const handleSubmit = async (values: Partial<UserProfile>) => {
        await updateProfile(values);
        setEditMode(false);
        console.log(values);
    }

    return (
        <Formik initialValues={{
            displayName: profile?.displayName,
            biography: profile?.biography,
        }} onSubmit={values => handleSubmit(values)}
           validationSchema={validationSchema}
        >
            {({ handleSubmit, isSubmitting, isValid, dirty }) => (
                <Form className='ui form' onSubmit={handleSubmit}>
                    <TextInput name='displayName' placeholder='Display Name' />
                    <TextArea rows={3} name='biography' placeholder='Add your bio' />
                    <Button
                        positive
                        type='submit'
                        floated='right'
                        content='Update profile'
                        loading={isSubmitting}
                        disabled={!isValid || !dirty}
                    />
                </Form>
            )}
        </Formik>
    );
}
export default observer(ProfileEditForm);