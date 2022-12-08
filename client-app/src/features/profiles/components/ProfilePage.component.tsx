import { useEffect } from "react";
import { useParams } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { useMobXStore } from "../../../app/stores/root.store";

import { Grid } from "semantic-ui-react";
import Spinner from "app/common/components/loaders/Spinner.component";

import ProfileHeader from "./profile-main/ProfileHeader.component";
import ProfileContent from "./profile-main/ProfileContent.component";

const ProfilePage = () => {
    const { username } = useParams<{username: string}>();

    const { profileStore } = useMobXStore();
    const { profile, isLoading, fetchProfile, setActiveTab } = profileStore;

    useEffect(() => {
        fetchProfile(username!).then();

        return () => {
            setActiveTab(0);
        }
    }, [fetchProfile, setActiveTab, username]);

    if (isLoading)
        return <Spinner content='Loading profile...' />

    return (
        <Grid>
            <Grid.Column width={16}>
                {profile && (
                    <>
                        <ProfileHeader profile={profile} />
                        <ProfileContent profile={profile} />
                    </>
                )}
            </Grid.Column>
        </Grid>
    );
};

export default observer(ProfilePage);