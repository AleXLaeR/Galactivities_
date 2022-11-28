import {UserActivity} from "../../models/UserProfile.model";
import {Card, Divider, Image} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {format} from "date-fns";

const ProfileActivityCard = (props: { activity: UserActivity }) => (
    <Card
        as={Link}
        to={`/activities/${props.activity.id}`}
        style={{border: '2px inset rgba(255, 255, 255, .7)', boxShadow: '2px 1px 2px 1px rgba(0, 0, 0, .4)'}}
    >
        <Image
            src={`/assets/categoryImages/${props.activity.category}.jpg`}
            style={{minHeight: "100px", objectFit: "cover"}}
        />
        <Card.Content>
        <Card.Header textAlign="center">{props.activity.title}</Card.Header>
            <Divider style={{margin: '.25rem'}} />
            <Card.Meta textAlign="center">
            <div>
                {format(new Date(props.activity.date), "do LLL")}
            </div>
            <div>
                {format(new Date(props.activity.date), "h:mm a")}
            </div>
            </Card.Meta>
        </Card.Content>
    </Card>
);

export default ProfileActivityCard;