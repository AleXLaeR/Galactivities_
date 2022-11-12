import 'react-datepicker/dist/react-datepicker.css';

import { useField } from "formik";

import { Form, Label } from "semantic-ui-react";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

const DateInput = (props: Partial<ReactDatePickerProps>) => {
    const [field, meta, helpers] = useField(props.name!);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <ReactDatePicker
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {(meta.touched && meta.error) ? (
                <Label basic color='red' style={{marginTop: '.5rem'}}>{meta.error}</Label>
            ) : null}
        </Form.Field>
    );
}

export default DateInput;