import { format } from "date-fns";
import { UserActivity } from "models/users/UserProfile";
import {DATE_FORMAT, IMAGE_URIS, ROUTES} from "app/common/contants";

import { Link } from "react-router-dom";
import { Card, Divider, Image } from "semantic-ui-react";

const CardStyles = {
    border: '2px inset rgba(255, 255, 255, .7)',
    boxShadow: '2px 1px 2px 1px rgba(0, 0, 0, .4)',
}

const ProfileActivityCard = (props: { activity: UserActivity }) => (
    <Card
        as={Link}
        to={`${ROUTES.ACTIVITIES.LIST}/${props.activity.id}`}
        style={CardStyles}
    >
        <Image
            src={`${IMAGE_URIS.BASE}/${props.activity.category}.jpg`}
            style={{minHeight: "100px", objectFit: "cover"}}
        />
        <Card.Content>
        <Card.Header textAlign="center">{props.activity.title}</Card.Header>
            <Divider style={{margin: '.25rem'}} />
            <Card.Meta textAlign="center">
            <div>
                {format(new Date(props.activity.date), DATE_FORMAT.DAY_WITH_MONTH_LOWERCASE)}
            </div>
            <div>
                {format(new Date(props.activity.date), DATE_FORMAT.FULL_TIME_ABBR)}
            </div>
            </Card.Meta>
        </Card.Content>
    </Card>
);

export default ProfileActivityCard;