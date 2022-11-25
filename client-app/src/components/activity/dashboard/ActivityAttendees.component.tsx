import { observer } from "mobx-react-lite";
import {Image, List} from "semantic-ui-react";
import {UserProfile} from "../../../models/UserProfile.model";
import {Link} from "react-router-dom";

interface Props {
    attendees: UserProfile[]
}

const ActivityAttendees = ({ attendees }: Props) => {
    return (
        <List horizontal>
            {attendees.map(attendee => (
                <List.Item key={attendee.username} as={Link} to={`profiles/${attendee.username}`}>
                    <Image size='mini' circular src={attendee.imageUri || '/assets/user.png'} />
                </List.Item>
            ))}
        </List>
    );
}

export default observer(ActivityAttendees);