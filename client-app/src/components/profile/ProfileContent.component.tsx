import { Tab } from "semantic-ui-react";
import ProfileImages from "./ProfileImages.component";
import { UserProfile } from "../../models/UserProfile.model";
import { observer } from "mobx-react-lite";

interface Props {
    profile: UserProfile;
}

const ProfileContent = ({ profile }: Props) => {
    const panes = [
        { menuItem: 'About', render: () => <Tab.Pane>About</Tab.Pane> },
        { menuItem: 'Photos', render: () => <ProfileImages images={profile.images} /> },
        { menuItem: 'Events', render: () => <Tab.Pane>Events</Tab.Pane> },
        { menuItem: 'Followers', render: () => <Tab.Pane>Followers</Tab.Pane> },
        { menuItem: 'Following', render: () => <Tab.Pane>Following</Tab.Pane> },
    ];

    return (
        <Tab
            menu={{fluid: true, vertical: true}}
            menuPosition='right'
            panes={panes}
        />
    );
};

export default observer(ProfileContent);