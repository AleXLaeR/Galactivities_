import { useEffect } from "react";

import { observer } from "mobx-react-lite";
import  { useMobXStore } from "../../../app/stores/root.store";

import ActivityFilters from "./filters/ActivityFilters.component";
import { Container, Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList.component';
import Spinner from "../../helpers/Spinner.component.";

const ActivityDashboard = () => {
    const { activityStore } = useMobXStore();

    useEffect(() => {
        activityStore.fetchActivities().then(() => {});
    }, [activityStore]);

    if (activityStore.isLoadingInitial)
        return <Spinner content='Loading activities...' />

    return (
        <Container style={{marginTop: '6rem'}}>
            <Grid>
                <Grid.Column width='10'>
                    <ActivityList/>
                </Grid.Column>
                <Grid.Column width='6'>
                    <ActivityFilters/>
                </Grid.Column>
            </Grid>
        </Container>
    );
};

export default observer(ActivityDashboard);