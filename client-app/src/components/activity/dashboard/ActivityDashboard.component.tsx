import { Container, Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList.component';

import { observer } from "mobx-react-lite";
import ActivityFilters from "./filters/ActivityFilters.component";

const ActivityDashboard = () => (
    <Container style={{marginTop: '6rem'}}>
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                <ActivityFilters />
            </Grid.Column>
        </Grid>
    </Container>
);

export default observer(ActivityDashboard);