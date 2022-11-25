import { observer } from "mobx-react-lite";

import { Link } from "react-router-dom";

import { ROUTES } from "../../utils/contants.utils";
import { UserProfile } from "../../models/UserProfile.model";

import {Button, ButtonGroup, Card, Icon, Image} from "semantic-ui-react";

interface Props {
    profile: UserProfile;
}

const ProfileCard = ({ profile }: Props) => (
    <Card>
        <Image src={profile.imageUri || 'assets/user.png'}/>
        <Card.Content style={{textAlign: 'center'}}>
            <ButtonGroup>
                <Button as={Link} to={`${ROUTES.PROFILE.BASE}/${profile.username}`}>
                    <Icon name='user' />
                    Profile
                </Button>
                <Button.Or />
                <Button>
                    <Icon name='pencil' />
                   Follow
                </Button>
            </ButtonGroup>
        </Card.Content>
        <Card.Content>
            <Card.Header>{profile.displayName}</Card.Header>
            <Card.Description>

            </Card.Description>
            <Card.Content extra>
                <Icon name='pencil' />
                10 followers
            </Card.Content>
        </Card.Content>
    </Card>
);

export default observer(ProfileCard);