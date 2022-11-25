import { observer } from "mobx-react-lite";
import { Activity } from "../../../models/Activity.model";

import {Button, Header, Item, Segment, Image, Label} from 'semantic-ui-react';
import {Link} from "react-router-dom";
import {ROUTES} from "../../../utils/contants.utils";
import {format} from "date-fns";
import {useMobXStore} from "../../../app/stores/root.store";

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

const ActivityDetailedHeader = ({ activity }: Props) => {
    const { activityStore } = useMobXStore();
    const { isLoadingInitial, updateAttendance, cancelActivityToggle } = activityStore;

    return (
        <Segment.Group>
            <Segment basic attached='top' style={{border: '6px double teal'}}>
                {activity.isCancelled && (
                    <Label
                        style={{position: 'absolute', zIndex: '100', left: '-1rem', top: '1.25rem'}}
                        ribbon
                        color='red'
                        content='Cancelled'
                    />
                )}
                <Image src={`/assets/categoryImages/${activity.category}.jpg`} fluid style={activityImageStyle} />
                <Segment style={activityImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header
                                    size='huge'
                                    content={activity.title}
                                    style={{color: 'white'}}
                                />
                                <p>{format(activity.date, 'dd MMM yyyy h:mm aa')}</p>
                                <p>Hosted by
                                    <strong>
                                        <Link to={`profiles/${activity.host?.username}`}>
                                            {' ' + activity.host?.displayName}
                                        </Link>
                                    </strong>
                                </p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                {activity.isHost ? (
                    <>
                        <Button
                            basic
                            floated='left'
                            color={activity.isCancelled ? 'green' : 'red'}
                            content={(activity.isCancelled ? 'Re-activate' : 'Cancel')  + ' Activity'}
                            onClick={cancelActivityToggle}
                            loading={isLoadingInitial}
                        />
                        <Button
                            disabled={activity.isCancelled}
                            as={Link}
                            to={`${ROUTES.ACTIVITIES.EDIT}/${activity.id}`}
                            color='orange'
                            floated='right'
                        >
                            Manage Event
                        </Button>
                    </>
                ) : (
                    activity.isGoing ? (
                        <Button
                            loading={isLoadingInitial}
                            onClick={updateAttendance}
                        >
                            Cancel attendance
                        </Button>
                    ) : (
                        <Button
                            disabled={activity.isCancelled}
                            loading={isLoadingInitial}
                            onClick={updateAttendance}
                            color='teal'
                        >
                            Join Activity
                        </Button>
                    )
                )}
            </Segment>
        </Segment.Group>
    );
};

export default observer(ActivityDetailedHeader);