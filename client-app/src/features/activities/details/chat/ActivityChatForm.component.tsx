import * as Yup from 'yup';
import { Field, FieldProps, Form, Formik } from 'formik';
import { Loader } from 'semantic-ui-react';
import { useMobXStore } from 'app/stores/root.store';

const ActivityChatForm = () => {
    const { commentStore: { addComment } } = useMobXStore();

    return (
        <Formik
            onSubmit={(values, { resetForm }) => addComment(values).then(() => resetForm())}
            initialValues={{ body: '' }}
            validationSchema={Yup.object({
                body: Yup.string().required()
            })}
        >
            {({ isSubmitting, isValid, handleSubmit }) => (
                <Form className='ui form'>
                    <Field name='body'>
                        {(props: FieldProps) => (
                            <div style={{ position: 'relative' }}>
                                <Loader active={isSubmitting} />
                                <textarea
                                    rows={3}
                                    placeholder='Enter your comment (Enter to submit, SHIFT + Enter for new line)'
                                    {...props.field}
                                    onKeyDown={(e) => {
                                        if (e.key === 'Enter' && e.shiftKey) {
                                            return;
                                        }
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                            e.preventDefault();
                                            isValid && handleSubmit();
                                        }
                                    }}
                                />
                            </div>
                        )}
                    </Field>
                </Form>
            )}
        </Formik>
    );
}

export default ActivityChatForm;