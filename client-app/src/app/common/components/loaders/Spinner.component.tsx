import { Dimmer, Loader, LoaderProps } from 'semantic-ui-react';

interface SpinnerProps extends LoaderProps {
    inverted?: boolean;
}

const Spinner = ({ inverted = true, ...otherProps }: SpinnerProps) => (
    <Dimmer active inverted={inverted}>
        <Loader {...otherProps} content={otherProps.content ?? 'Loading App...'} />
    </Dimmer>
);

export default Spinner;