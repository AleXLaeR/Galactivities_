import { IMAGE_URIS, ROUTES } from "app/common/contants";
import { UserProfile } from "models/users/UserProfile";

import { Link } from "react-router-dom";
import { Image, Item, Label } from "semantic-ui-react";

interface Props {
    attendee: UserProfile;
    isHost?: boolean;
}

const ActivitySideBarItem = ({ attendee, isHost = true }: Props) => (
    <Item key={attendee.username} style={{ position: 'relative' }}>
        {isHost && (
            <Label
                style={{ position: 'absolute' }}
                color='orange'
                ribbon='right'
            >
                Host
            </Label>
        )}
        <Image
            size='tiny'
            src={attendee.imageUri || IMAGE_URIS.USER_DEFAULT}
            style={{borderRadius: '8px', border: '6px outset rgba(255, 255, 255, .9)'}}
        />
        <Item.Content verticalAlign='middle'>
            <Item.Header as='h3'>
                <Link to={`${ROUTES.PROFILE.BASE}/${attendee.username}`}>
                    {attendee.displayName}
                </Link>
            </Item.Header>
            {attendee.isFollowing && (
                <Item.Extra style={{ color: 'orange' }}>Following</Item.Extra>
            )}
        </Item.Content>
    </Item>
);

export default ActivitySideBarItem;