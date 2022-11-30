import {Button, Divider, Grid, Header, Item, Reveal, Segment, Statistic} from "semantic-ui-react";
import {UserProfile} from "../../models/UserProfile.model";
import {observer} from "mobx-react-lite";

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
                    <Divider/>
                    <Reveal animated='move'>
                        <Reveal.Content visible style={{width: '100%'}}>
                            <Button fluid color='teal' content='Following'/>
                        </Reveal.Content>
                        <Reveal.Content hidden style={{width: '100%'}}>
                            <Button
                                fluid
                                basic
                                color={profile.isFollowing ? 'red' : 'green'}
                                content={profile.isFollowing ? 'Unfollow' : 'Follow'}
                            />
                        </Reveal.Content>
                    </Reveal>
                </Grid.Column>
            </Grid>
        </Segment>
    );
};

export default observer(ProfileHeader);