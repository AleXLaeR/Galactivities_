import React from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityDetails from './ActivityDetails.component';
import ActivityForm from './ActivityForm.component';
import ActivityList from './ActivityList.component';
import {useMobXStore} from "../../app/stores/root.store";
import {observer} from "mobx-react-lite";

const ActivityDashboard = () => {
    const { activityStore } = useMobXStore();
    const { selectedActivity, isEditMode } = activityStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !isEditMode &&
                    <ActivityDetails activity={selectedActivity} />}
                {isEditMode && <ActivityForm />}
            </Grid.Column>
        </Grid>
    )
}

export default observer(ActivityDashboard);