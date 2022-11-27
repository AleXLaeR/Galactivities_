import { Tab } from "semantic-ui-react";
import ProfileImages from "./ProfileImages.component";
import { UserProfile } from "../../models/UserProfile.model";
import { observer } from "mobx-react-lite";
import ProfileAbout from "./ProfileAbout";

interface Props {
    profile: UserProfile;
}

const borderRadStyle = {
    borderRadius: '6px'
}

const ProfileContent = ({ profile }: Props) => {
    const panes = [
        { menuItem: 'About', render: () => <ProfileAbout /> },
        { menuItem: 'Photos', render: () => <ProfileImages profile={profile} /> },
        { menuItem: 'Events', render: () => <Tab.Pane style={borderRadStyle}>Events</Tab.Pane> },
        { menuItem: 'Followers', render: () => <Tab.Pane style={borderRadStyle}>Followers</Tab.Pane> },
        { menuItem: 'Following', render: () => <Tab.Pane style={borderRadStyle}>Following</Tab.Pane> },
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