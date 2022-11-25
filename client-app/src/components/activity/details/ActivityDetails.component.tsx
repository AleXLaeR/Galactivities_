import { useEffect } from 'react';
import { useParams } from "react-router-dom";

import { useMobXStore } from "../../../app/stores/root.store";
import { observer } from "mobx-react-lite";

import { Container, Grid } from 'semantic-ui-react';

import ActivityDetailedHeader from "./ActivityDetailsHeader.component";
import ActivityDetailedInfo from "./ActivityDetailsInfo.component";
import ActivityDetailedChat from "./ActivityDetailedChat.component";
import ActivityDetailedSideBar from "./ActivityDetailedSideBar.component";


const ActivityDetails = () => {
    const { activityStore } = useMobXStore();
    let { selectedActivity: activity, fetchActivity } = activityStore;

    const { id } = useParams<{id: string}>();

    useEffect(() => {
        if (id) {
            fetchActivity(id).then();
        }
    }, [id, fetchActivity]);

    if (!activity) return null;

    return (
        <Container style={{marginTop: '6rem'}}>
            <Grid>
                <Grid.Column width={10}>
                    <ActivityDetailedHeader activity={activity} />
                    <ActivityDetailedInfo activity={activity} />
                    <ActivityDetailedChat />
                </Grid.Column>
                <Grid.Column width={6}>
                    <ActivityDetailedSideBar activity={activity} />
                </Grid.Column>
            </Grid>
        </Container>
    );
}

export default observer(ActivityDetails);