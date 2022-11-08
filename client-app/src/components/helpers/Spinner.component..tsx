import { Dimmer, Loader } from 'semantic-ui-react';

interface Props {
    inverted?: boolean;
    content?: string;
}

export default function Spinner({inverted = true, content = 'Loading App...'}: Props) {
    return (
        <Dimmer active inverted={inverted}>
            <Loader content={content} />
        </Dimmer>
    )
}