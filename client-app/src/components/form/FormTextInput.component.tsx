import { useField } from "formik";
import {Form, Label} from "semantic-ui-react";

interface Props {
    name: string;
    placeholder: string;
    label?: string;
}

const TextInput = (props: Props) => {
    const [field, meta] = useField(props);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <input {...field} {...props}/>
            {(meta.touched && meta.error) ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    );
}

export default TextInput;