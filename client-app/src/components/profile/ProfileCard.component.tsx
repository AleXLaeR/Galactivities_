import { observer } from "mobx-react-lite";

import { Link } from "react-router-dom";

import { ROUTES } from "../../utils/contants.utils";
import { UserProfile } from "../../models/UserProfile.model";

import {Button, ButtonGroup, Card, Divider, Icon, Image} from "semantic-ui-react";
import FollowButton from "./FollowButton.component";

interface Props {
    profile: UserProfile;
}

const truncate = (str?: string, upTo: number = 50) => {
    if (str) {
        return (str.length > upTo) ? str.substring(0, upTo - 3) + '...' : str;
    }
}

const ProfileCard = ({ profile }: Props) => (
    <Card>
        <Image src={profile.imageUri || 'assets/user.png'}/>
        <Card.Content style={{textAlign: 'center'}}>
            <ButtonGroup>
                <Button style={{marginRight: '1rem', borderRadius: '4px'}} as={Link} to={`${ROUTES.PROFILE.BASE}/${profile.username}`}>
                    <Icon name='user' />
                    Profile
                </Button>
                <FollowButton profile={profile} />
            </ButtonGroup>
        </Card.Content>
        <Card.Content>
            <Card.Header>{profile.displayName}</Card.Header>
            <Card.Description>
                {truncate(profile.biography)}
            </Card.Description>
            <Divider />
            <Card.Content extra>
                <div style={{display: 'flex', justifyContent: 'space-between'}}>
                    <span><Icon name='pencil' /> {profile.followersCount} followers</span>
                    <span><Icon name='address book' /> {profile.followingCount} followings</span>
                </div>
            </Card.Content>
        </Card.Content>
    </Card>
);

export default observer(ProfileCard);