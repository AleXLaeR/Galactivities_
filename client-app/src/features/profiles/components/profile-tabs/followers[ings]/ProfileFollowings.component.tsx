import { observer } from "mobx-react-lite";
import { useMobXStore } from "app/stores/root.store";

import { Card, Grid, Header, Tab } from "semantic-ui-react";
import ProfileCard from "../../profile-main/ProfileCard.component";

const ProfileFollowings = () => {
    const { profileStore } = useMobXStore();
    const { profile, followings, loadingFollowings, activeTab } = profileStore;

    return (
        <Tab.Pane style={{borderRadius: '6px'}} loading={loadingFollowings}>
            <Grid>
                <Grid.Column width={16}>
                    <Header
                        floated='left'
                        icon='user'
                        content={(activeTab === 3) ?
                            `People following ${profile?.displayName}`
                            : `People ${profile?.displayName} is following`}
                    />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Card.Group itemsPerRow={3}>
                        {(followings.length !== 0) ? (
                            followings.map(profile => (
                            <ProfileCard size='mini' key={profile.username} profile={profile} />
                        ))) : (
                            <Header
                                as="h3"
                                content="Nothing to show here"
                                textAlign="center"
                                style={{ marginTop: '2.25rem', position: 'relative', left: '40%' }}
                            />
                        )}
                    </Card.Group>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
}

export default observer(ProfileFollowings);