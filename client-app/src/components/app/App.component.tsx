import './App.styles.scss';
import { useEffect } from 'react';

import {Container} from 'semantic-ui-react';
import NavBar from '../NavBar.component';
import ActivityDashboard from '../activity/ActivityDashboard.component';
import Spinner from '../Spinner.component.';

import {useMobXStore} from "../../app/stores/root.store";
import {observer} from "mobx-react-lite";

const App = () => {
    const { activityStore } = useMobXStore();

    useEffect(() => {
        activityStore.fetchActivities();
    }, [activityStore]);

    return (
        <>
          <NavBar />
          {(activityStore.isLoadingInitial) ? <Spinner /> : (
              <Container style={{marginTop: '7em'}}>
                <ActivityDashboard />
              </Container>
          )}
        </>
    );
}

export default observer(App);
