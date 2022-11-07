import { Container, Grid } from 'semantic-ui-react';
import ActivityList from './ActivityList.component';

import { observer } from "mobx-react-lite";

const ActivityDashboard = () => (
    <Container style={{marginTop: '6rem'}}>
        <Grid>
            <Grid.Column width='10'>
                <ActivityList/>
            </Grid.Column>
            <Grid.Column width='6'>
                <h2>Future Activity filters</h2>
            </Grid.Column>
        </Grid>
    </Container>
);

export default observer(ActivityDashboard);