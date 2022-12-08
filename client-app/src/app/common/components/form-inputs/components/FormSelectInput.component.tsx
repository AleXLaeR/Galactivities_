import { useField } from "formik";
import { Form, Select } from "semantic-ui-react";
import ErrorLabel from "./helpers/ErrorLabel";

interface Props {
    name: string;
    placeholder: string;
    options: any;
    label?: string;
}

const SelectInput = (props: Props) => {
    const [field, meta, helpers] = useField(props.name);

    return (
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <Select
                value={field?.value}
                options={props.options}
                onChange={(_, data) => helpers.setValue(data.value)}
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
                closeOnEscape
            />
            <ErrorLabel meta={meta} />
        </Form.Field>
    );
}

export default SelectInput;