import {Divider, Grid, Header, Item, Segment, Statistic} from "semantic-ui-react";
import {UserProfile} from "../../models/UserProfile.model";
import {observer} from "mobx-react-lite";
import FollowButton from "./FollowButton.component";

interface Props {
    profile: UserProfile;
}

const ProfileHeader = ({ profile }: Props) => {
    return (
        <Segment>
            <Grid>
                <Grid.Column width={12}>
                    <Item.Group>
                        <Item>
                            <Item.Image avatar size='small' src={profile.imageUri || '/assets/user.png'} />
                            <Item.Content verticalAlign='middle'>
                                <Header as='h1' content={profile.displayName} />
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Grid.Column>
                <Grid.Column width={4}>
                    <Statistic.Group widths={2}>
                        <Statistic label='followers' value={profile.followersCount}/>
                        <Statistic label='following' value={profile.followingCount} />
                    </Statistic.Group>
                    <Divider />
                    <FollowButton profile={profile} />
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default observer(ProfileHeader);