import { useField } from "formik";
import {Form, Label} from "semantic-ui-react";

interface Props {
    name: string;
    placeholder: string;
    rows?: number,
    label?: string;
}

const TextArea = (props: Props) => {
    const [field, meta] = useField(props);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <textarea rows={props.rows ?? 3} {...field} {...props}/>
    {(meta.touched && meta.error) ? (
        <Label basic color='red' style={{marginTop: '.5rem'}}>{meta.error}</Label>
    ) : null}
    </Form.Field>
);
}

export default TextArea;