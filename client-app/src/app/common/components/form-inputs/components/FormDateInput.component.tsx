import 'react-datepicker/dist/react-datepicker.css';

import { useField } from "formik";
import ReactDatePicker, { ReactDatePickerProps } from "react-datepicker";

import { Form } from "semantic-ui-react";
import ErrorLabel from "./helpers/ErrorLabel";

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
            <ErrorLabel meta={meta} />
        </Form.Field>
    );
}

export default DateInput;