import { Comment } from "semantic-ui-react";
import CommentModel from "models/comments/Comment";
import { IMAGE_URIS, ROUTES } from 'app/common/contants';
import { Link } from 'react-router-dom';
import { formatDistanceToNow } from 'date-fns';

interface Props {
    comment: CommentModel;
}

const CommentItem = ({ comment: { body, createdAt, displayName, username, imageUri } }: Props) => (
    <Comment style={{ padding: '.35rem 0' }}>
        <Comment.Avatar src={imageUri ?? IMAGE_URIS.USER_DEFAULT} />
        <Comment.Content>
            <Comment.Author as={Link} to={`${ROUTES.PROFILE.BASE}/${username}`}>
                {displayName}
            </Comment.Author>
            <Comment.Metadata>
                <h5>
                    {`${formatDistanceToNow(createdAt)} ago`}
                </h5>
            </Comment.Metadata>
            <Comment.Text style={{ whiteSpace: 'pre-wrap' }}>
                {body}
            </Comment.Text>
        </Comment.Content>
    </Comment>
);

export default CommentItem;