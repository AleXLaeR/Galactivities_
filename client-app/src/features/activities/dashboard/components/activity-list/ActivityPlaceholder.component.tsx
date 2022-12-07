import { Button, Placeholder, Segment } from "semantic-ui-react";

const ActivityPlaceholder = () => (
        <Placeholder fluid style={{ marginTop: 25 }}>
            <Segment.Group>
                <Segment style={{ minHeight: 110 }}>
                    <Placeholder>
                        <Placeholder.Header image>
                            <Placeholder.Line />
                            <Placeholder.Line />
                        </Placeholder.Header>
                        <Placeholder.Paragraph>
                            <Placeholder.Line />
                        </Placeholder.Paragraph>
                    </Placeholder>
                </Segment>
                <Segment>
                    <Placeholder>
                        <Placeholder.Line />
                        <Placeholder.Line />
                    </Placeholder>
                </Segment>
                <Segment secondary style={{ minHeight: 70 }} />
                <Segment clearing>
                    <Button disabled color='blue' floated='right' content='View' />
                    <Button disabled color='red' floated='right' content='Delete' />
                </Segment>
            </Segment.Group>
        </Placeholder>
);

export default ActivityPlaceholder;