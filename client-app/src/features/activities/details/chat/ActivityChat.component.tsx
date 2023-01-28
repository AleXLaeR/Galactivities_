import { observer } from 'mobx-react-lite'
import React, { useEffect } from 'react'
import { Segment, Header, Comment, Divider } from 'semantic-ui-react'
import CommentItem from './ActivityChatItem.component';
import { useMobXStore } from 'app/stores/root.store';
import ActivityChatForm from './ActivityChatForm.component';

interface Props {
    activityId: string;
}

const ActivityDetailedChat = ({ activityId }: Props) => {
    const { commentStore } = useMobXStore();
    const { createHubConnection, clearComments, comments } = commentStore;

    useEffect(() => {
        if (activityId) {
            createHubConnection(activityId);
        }
        return () => {
            clearComments();
        }
    }, [activityId, clearComments, createHubConnection]);

    return (
        <>
            <Segment
                textAlign='center'
                attached='top'
                inverted
                color='teal'
                style={{ border: 'none' }}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached clearing>
                <ActivityChatForm />
                <Comment.Group style={{ marginBottom: '.5rem' }}>
                    {comments.map((comment, idx) => (
                        <>
                            <CommentItem comment={comment} />
                            {(idx !== comments.length - 1) && (
                                <Divider style={{ marginTop: '-.15rem' }} />
                            )}
                        </>
                    ))}
                </Comment.Group>
            </Segment>
        </>
    )
};

export default observer(ActivityDetailedChat);