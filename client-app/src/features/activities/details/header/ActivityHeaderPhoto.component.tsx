import { format } from "date-fns";

import { Activity } from "models/activities/Activity";
import { DATE_FORMAT, ROUTES } from "app/common/contants";

import { Link } from "react-router-dom";
import { Header, Image, Item, Label, Segment } from "semantic-ui-react";

interface Props {
    activity: Activity;
}

const activityImageStyle = {
    filter: 'brightness(30%)',
    borderRadius: '8px'
};

const activityImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: '#e2e8e8',
};

const RibbonLabelStyles = {
    position: 'absolute',
    zIndex: '100',
    left: '-1rem',
    top: '1.25rem'
}

const ActivityHeaderPhoto = ({ activity }: Props) => (
    <Segment basic attached='top' style={{border: '6px double teal'}}>
        {activity.isCancelled && (
            <Label
                style={RibbonLabelStyles}
                ribbon
                color='red'
                content='Cancelled'
            />
        )}
        <Image fluid src={`/assets/categoryImages/${activity.category}.jpg`} style={activityImageStyle} />
        <Segment style={activityImageTextStyle} basic>
            <Item.Group>
                <Item>
                    <Item.Content>
                        <Header
                            size='huge'
                            content={activity.title}
                            style={{color: 'inherit'}}
                        />
                        <p>{format(activity.date, DATE_FORMAT.TIME_ABBR_LOWERCASE)}</p>
                        <p>Hosted by
                            <strong>
                                <Link to={`${ROUTES.PROFILE.BASE}/${activity.host?.username}`}>
                                    {' ' + activity.host?.displayName}
                                </Link>
                            </strong>
                        </p>
                    </Item.Content>
                </Item>
            </Item.Group>
        </Segment>
    </Segment>
);

export default ActivityHeaderPhoto;