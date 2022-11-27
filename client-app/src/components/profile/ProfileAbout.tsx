import { useMobXStore } from "../../app/stores/root.store";
import { useState } from "react";

import {Button, Grid, Header, Tab} from "semantic-ui-react";
import ProfileEditForm from "./ProfileEditForm.component";

const ProfileAbout = () => {
    const [isEditMode, setIsEditMode] = useState(false);

    const { profileStore } = useMobXStore();
    const { profile, isCurrentStoredUser } = profileStore;

    return (
        <Tab.Pane style={{borderRadius: '6px'}}>
            <Grid>
                <Grid.Column width={16}>
                    <Header
                        floated='left'
                        icon='user'
                        content={'About ' + profile?.displayName}
                    />
                    {isCurrentStoredUser && (
                        <Button
                            floated='right'
                            basic
                            content={isEditMode ? 'Cancel' : 'Edit Profile'}
                            onClick={() => setIsEditMode(!isEditMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width='16'>
                    {isEditMode ? <ProfileEditForm setEditMode={setIsEditMode}/> :
                        <span style={{whiteSpace: 'pre-wrap'}}>
                            {profile?.biography}
                        </span>
                    }
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
}

export default ProfileAbout;