import { Container, Grid } from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader.component";
import ProfileContent from "./ProfileContent.component";
import { observer } from "mobx-react-lite";
import {useParams} from "react-router-dom";
import {useMobXStore} from "../../app/stores/root.store";
import {useEffect} from "react";
import Spinner from "../helpers/Spinner.component.";

const ProfilePage = () => {
    const { username } = useParams<{username: string}>();

    const { profileStore } = useMobXStore();
    const { profile, isLoading, fetchProfile, setActiveTab } = profileStore;

    useEffect(() => {
        fetchProfile(username!).then();
        return () => setActiveTab(0);
    }, [fetchProfile, setActiveTab, username]);

    if (isLoading)
        return <Spinner  content='Loading profile...' />

    return (
        <Container style={{marginTop: '6rem'}}>
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
        </Container>
    );
};

export default observer(ProfilePage);