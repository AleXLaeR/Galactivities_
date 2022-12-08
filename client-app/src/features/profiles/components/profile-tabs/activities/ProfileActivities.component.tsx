import React, { SyntheticEvent, useEffect } from 'react';

import { observer } from 'mobx-react-lite';
import { useMobXStore } from "app/stores/root.store";

import { UserActivity } from "models/users/UserProfile";

import { Tab, Grid, Header, Card, TabProps } from 'semantic-ui-react';
import ProfileActivityCard from "./ProfileActivityCard.component";

const panes = [
    { menuItem: 'Future Events', pane: { key: 'future' } },
    { menuItem: 'Past Events', pane: { key: 'past' } },
    { menuItem: 'Hosting', pane: { key: 'hosting' } }
];

const ProfileActivities = () => {
    const { profileStore } = useMobXStore();
    const {
        loadUserActivities,
        profile,
        loadingActivities,
        userActivities
    } = profileStore;

    useEffect(() => {
        loadUserActivities(profile!.username).then();
    }, [loadUserActivities, profile]);

    const handleTabChange = async (e: SyntheticEvent, data: TabProps) => {
        await loadUserActivities(
            profile!.username,
            panes[data.activeIndex as number].pane.key
        );
    };

    return (
        <Tab.Pane loading={loadingActivities} style={{borderRadius: '6px'}}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='calendar' content={'Activities'} />
                </Grid.Column>
                <Grid.Column width={16}>
                    <Tab
                        panes={panes}
                        menu={{ secondary: true, pointing: true }}
                        onTabChange={(e, data) => handleTabChange(e, data)}
                    />
                    <br />
                    {(userActivities.length === 0) ? (
                        <Header
                            as='h3'
                            content='Nothing to show here'
                            textAlign='center'
                            style={{marginTop: '1rem'}}
                        />
                    ) : (
                        <Card.Group itemsPerRow={4}>
                            {userActivities?.map((activity: UserActivity) => (
                                <ProfileActivityCard key={activity.id} activity={activity} />
                            ))}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
}

export default observer(ProfileActivities);