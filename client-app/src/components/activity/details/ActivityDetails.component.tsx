import { useEffect } from 'react';
import { useParams } from "react-router-dom";

import { Activity } from '../../../models/activity';

import { useMobXStore } from "../../../app/stores/root.store";
import { observer } from "mobx-react-lite";

import { Container, Grid } from 'semantic-ui-react';
import Spinner from "../../helpers/Spinner.component.";

import ActivityDetailedHeader from "./ActivityDetailsHeader.component";
import ActivityDetailedInfo from "./ActivityDetailsInfo.component";
import ActivityDetailedChat from "./ActivityDetailedChat.component";
import ActivityDetailedSideBar from "./ActivityDetailedSideBar.component";

interface Props {
    newActivity?: Activity;
}

const ActivityDetails = ({ newActivity }: Props) => {
    const { activityStore } = useMobXStore();
    let { selectedActivity: activity, fetchActivity, isLoadingInitial } = activityStore;

    const { id } = useParams<{id: string}>();

    if (newActivity) {
        activity = newActivity;
    }

    useEffect(() => {
        if (id) {
            fetchActivity(id).then();
        }
    }, [id, fetchActivity]);

    if (isLoadingInitial || !activity)
        return <Spinner content='Loading activity...' />;

    return (
        <Container style={{marginTop: '6rem'}}>
            <Grid>
                <Grid.Column width={10}>
                    <ActivityDetailedHeader activity={activity} />
                    <ActivityDetailedInfo activity={activity} />
                    <ActivityDetailedChat/>
                </Grid.Column>
                <Grid.Column width={6}>
                    <ActivityDetailedSideBar />
                </Grid.Column>
            </Grid>
        </Container>
    );
}

export default observer(ActivityDetails);