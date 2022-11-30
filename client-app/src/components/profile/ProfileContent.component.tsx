import { Tab } from "semantic-ui-react";
import ProfileImages from "./ProfileImages.component";
import { UserProfile } from "../../models/UserProfile.model";
import { observer } from "mobx-react-lite";
import ProfileAbout from "./ProfileAbout.component";
import ProfileActivities from "./ProfileActivities.component";
import ProfileFollowings from "./ProfileFollowings.component";
import {useMobXStore} from "../../app/stores/root.store";

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