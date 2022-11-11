import { observer } from "mobx-react-lite";
import { Activity } from "../../../models/Activity.model";

import { Button, Header, Item, Segment, Image } from 'semantic-ui-react';

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
    color: 'white',
};

interface Props {
    activity: Activity
}

const ActivityDetailedHeader = ({ activity }: Props) => (
    <Segment.Group>
        <Segment basic attached='top' style={{border: '6px double teal'}}>
            <Image src={`/assets/categoryImages/${activity.category}.jpg`}  fluid style={activityImageStyle}/>
            <Segment style={activityImageTextStyle} basic>
                <Item.Group>
                    <Item>
                        <Item.Content>
                            <Header
                                size='huge'
                                content={activity.title}
                                style={{color: 'white'}}
                            />
                            <p>{activity.date}</p>
                            <p>
                                Hosted by <strong>Bob</strong>
                            </p>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
        </Segment>
        <Segment clearing attached='bottom'>
            <Button color='teal'>Join Activity</Button>
            <Button>Cancel attendance</Button>
            <Button color='orange' floated='right'>
                Manage Event
            </Button>
        </Segment>
    </Segment.Group>
);

export default observer(ActivityDetailedHeader);