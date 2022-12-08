import { Tab } from "semantic-ui-react";
import ProfileImages from "../profile-tabs/photos/ProfilePhotos.component";
import { UserProfile } from "../../../../models/users/UserProfile";
import { observer } from "mobx-react-lite";
import ProfileAbout from "../profile-tabs/about/ProfileAbout.component";
import ProfileActivities from "../profile-tabs/activities/ProfileActivities.component";
import ProfileFollowings from "../profile-tabs/followers[ings]/ProfileFollowings.component";
import {useMobXStore} from "../../../../app/stores/root.store";

interface Props {
    profile: UserProfile;
}

const ProfileContent = ({ profile }: Props) => {
    const { profileStore: { setActiveTab } } = useMobXStore();

    const panes = [
        { menuItem: 'About', render: () => <ProfileAbout /> },
        { menuItem: 'Photos', render: () => <ProfileImages profile={profile} /> },
        { menuItem: 'Events', render: () => <ProfileActivities /> },
        { menuItem: 'Followers', render: () => <ProfileFollowings /> },
        { menuItem: 'Following', render: () => <ProfileFollowings /> },
    ];

    return (
        <Tab
            menu={{fluid: true, vertical: true}}
            menuPosition='right'
            panes={panes}
            onTabChange={(_, data) => setActiveTab(data.activeIndex as number)}
        />
    );
};

export default observer(ProfileContent);