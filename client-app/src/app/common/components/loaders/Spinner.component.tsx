import { Dimmer, Loader, LoaderProps } from 'semantic-ui-react';

interface SpinnerProps extends LoaderProps {
    inverted?: boolean;
}

const Spinner = ({ inverted = true, content, ...otherProps }: SpinnerProps) => (
    <Dimmer active inverted={inverted}>
        <Loader {...otherProps} content={content ?? 'Loading App...'} />
    </Dimmer>
);

export default Spinner;