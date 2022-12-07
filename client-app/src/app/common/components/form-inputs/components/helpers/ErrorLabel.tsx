import { Label } from "semantic-ui-react";
import { FieldMetaProps } from "formik";

interface Props {
    meta: FieldMetaProps<any>;
}

const ErrorLabel = ({ meta }: Props) => (
    <>
        {(meta.touched && meta.error) && (
            <Label basic color='red' style={{marginTop: '.5rem'}}>{meta.error}</Label>
        )}
    </>
);

export default ErrorLabel;