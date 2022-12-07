import { observer } from 'mobx-react-lite';

import { Segment, Header, Comment, Form, Button } from 'semantic-ui-react';
import CommentItem from "./ActivityChatItem.component";

const ActivityChat = () => (
    <>
        <Segment
            textAlign='center'
            attached='top'
            inverted
            color='teal'
            style={{border: 'none'}}
        >
            <Header>Chat about this event</Header>
        </Segment>
        <Segment attached style={{borderRadius: '6px'}}>
            <Comment.Group>
                <CommentItem comment={{}} />
                <CommentItem comment={{}} />
                <Form reply>
                    <Form.TextArea />
                    <Button
                        content='Add Reply'
                        labelPosition='left'
                        icon='edit'
                        primary
                    />
                </Form>
            </Comment.Group>
        </Segment>
    </>
);

export default observer(ActivityChat);