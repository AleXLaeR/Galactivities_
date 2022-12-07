import { useField } from "formik";
import { Form } from "semantic-ui-react";
import ErrorLabel from "./helpers/ErrorLabel";

interface Props {
    name: string;
    placeholder: string;
    label?: string;
    type?: string;
}

const TextInput = (props: Props) => {
    const [field, meta] = useField(props);

    const isErrorState = meta.touched && !!meta.error;

    return (
        <Form.Field error={isErrorState}>
            <label>{props.label}</label>
            <input {...field} {...props} />
            <ErrorLabel meta={meta} />
        </Form.Field>
    );
}

export default TextInput;