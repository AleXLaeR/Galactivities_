import { Comment } from "semantic-ui-react";

interface Props {
    comment: any;
}

const CommentItem = ({ comment }: Props) => (
    <Comment>
        <Comment.Avatar src='/assets/user.png'/>
        <Comment.Content>
            <Comment.Author as='a'>Joe Henderson</Comment.Author>
            <Comment.Metadata>
                <div>5 days ago</div>
            </Comment.Metadata>
            <Comment.Text>Dude, this is awesome. Thanks so much</Comment.Text>
            <Comment.Actions>
                <Comment.Action>Reply</Comment.Action>
            </Comment.Actions>
        </Comment.Content>
    </Comment>
);

export default CommentItem;