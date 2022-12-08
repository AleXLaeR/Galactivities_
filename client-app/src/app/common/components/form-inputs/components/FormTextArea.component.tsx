import { useField } from "formik";
import { Form } from "semantic-ui-react";
import ErrorLabel from "./helpers/ErrorLabel";

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
            <ErrorLabel meta={meta} />
        </Form.Field>
    );
}

export default TextArea;