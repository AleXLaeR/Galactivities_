import { useState } from "react";

import { observer } from "mobx-react-lite";
import { useMobXStore } from "app/stores/root.store";

import { Button, Grid, Header, Tab } from "semantic-ui-react";
import ProfileEditForm from "./ProfileEditForm.component";

const ProfileAbout = () => {
    const [isEditMode, setIsEditMode] = useState(false);

    const { profileStore } = useMobXStore();
    const { profile, isActiveUserStored } = profileStore;

    return (
        <Tab.Pane style={{borderRadius: '6px'}}>
            <Grid>
                <Grid.Column width={16}>
                    <Header
                        floated='left'
                        icon='user'
                        content={`About ${profile?.displayName}`}
                    />
                    {isActiveUserStored && (
                        <Button
                            floated='right'
                            basic
                            content={isEditMode ? 'Cancel' : 'Edit Profile'}
                            onClick={() => setIsEditMode(prev => !prev)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width='16'>
                    <>
                        {isEditMode ? (
                            <ProfileEditForm setEditMode={setIsEditMode}/>
                        ) : (
                            (!profile?.biography || profile.biography === '') ? (
                                <Header
                                    as="h3"
                                    content="Nothing to show here"
                                    textAlign="center"
                                    style={{ marginTop: '1rem' }}
                                />
                            ) : (
                                <span style={{ whiteSpace: 'pre-wrap' }}>
                                    {profile?.biography}
                                </span>
                            )
                        )}
                    </>
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
}

export default observer(ProfileAbout);
