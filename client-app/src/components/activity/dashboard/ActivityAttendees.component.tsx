import { observer } from "mobx-react-lite";
import {Image, List, Popup} from "semantic-ui-react";
import {UserProfile} from "../../../models/UserProfile.model";
import {Link} from "react-router-dom";
import ProfileCard from "../../profile/ProfileCard.component";

interface Props {
    attendees: UserProfile[]
}

const ActivityAttendees = ({ attendees }: Props) => (
    <List horizontal>
        {attendees.map(attendee => (
            <Popup
                hoverable
                key={attendee.username}
                trigger={
                <List.Item key={attendee.username} as={Link} to={`profiles/${attendee.username}`}>
                    <Image size='mini' circular src={attendee.imageUri || '/assets/user.png'}/>
                </List.Item>
            }
            >
                <Popup.Content>
                    <ProfileCard profile={attendee} />
                </Popup.Content>
            </Popup>
        ))}
    </List>
);

export default observer(ActivityAttendees);