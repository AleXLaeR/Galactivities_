import { useParams } from "react-router-dom";

import { useMobXStore } from "app/stores/root.store";
import { observer } from "mobx-react-lite";

import { Grid } from "semantic-ui-react";
import Spinner from "app/common/components/loaders/Spinner.component";

import ActivityHeader from "./header/ActivityHeader.component";
import ActivityInfo from "./ActivityInfo.component";
import ActivityChat from "./chat/ActivityChat.component";
import ActivitySideBar from "./side-bar/ActivitySideBar.component";
import { useEffect } from 'react';

const ActivityDetails = () => {
    const { id } = useParams<{ id: string }>();
    const { activityStore  } = useMobXStore();
    const { selectedActivity, fetchActivity, clearSelectedActivity } = activityStore;

    useEffect(() => {
        if (id) {
            fetchActivity(id).then();
        }
        return () => clearSelectedActivity();
    }, [id, fetchActivity, clearSelectedActivity]);

    if (!selectedActivity)
        return <Spinner content='Loading activity...' />;

    return (
        <Grid>
            <Grid.Column width={10}>
                <ActivityHeader activity={selectedActivity} />
                <ActivityInfo activity={selectedActivity} />
                <ActivityChat activityId={selectedActivity.id} />
            </Grid.Column>
            <Grid.Column width={6}>
                <ActivitySideBar activity={selectedActivity} />
            </Grid.Column>
        </Grid>
    );
}

export default observer(ActivityDetails);