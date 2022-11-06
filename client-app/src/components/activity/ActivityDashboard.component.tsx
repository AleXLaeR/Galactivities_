import React from 'react';
import { Grid } from 'semantic-ui-react';
import ActivityDetails from './ActivityDetails.component';
import ActivityForm from './ActivityForm.component';
import ActivityList from './ActivityList.component';
import {useSelector} from "react-redux";
import {selectSelectedActivity} from "../../reducers/activity/activity.selector";
import {selectIsEditMode} from "../../reducers/state/state.selector";

const ActivityDashboard = () => {
    const selectedActivity = useSelector(selectSelectedActivity);
    const isEditMode = useSelector(selectIsEditMode);

    return (
        <Grid>
            <Grid.Column width='10'>
                <ActivityList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedActivity && !isEditMode &&
                <ActivityDetails activity={selectedActivity} />}
                {isEditMode && <ActivityForm activity={selectedActivity} />}
            </Grid.Column>
        </Grid>
    )
}

export default ActivityDashboard;