import {Message} from "semantic-ui-react";

interface Props {
    errors: string[]
}

const ValidationErrorList = ({ errors }: Props) => (
    <Message error>
        {errors && (
            <Message.List>
                {errors.map((error: string, idx) => (
                    <Message.Item key={idx}>
                        {error}
                    </Message.Item>
                ))}
            </Message.List>
        )}
    </Message>
);

export default ValidationErrorList;