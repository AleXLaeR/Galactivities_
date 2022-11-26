import {Container, Grid} from "semantic-ui-react";
import ProfileHeader from "./ProfileHeader.component";
import ProfileContent from "./ProfileContent.component";

const ProfilePage = () => (
    <Container style={{marginTop: '6rem'}}>
        <Grid>
            <Grid.Column width={16}>
                <ProfileHeader />
                <ProfileContent />
            </Grid.Column>
        </Grid>
    </Container>
);

export default ProfilePage;