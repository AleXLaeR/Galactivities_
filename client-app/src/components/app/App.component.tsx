import './App.styles.scss';
import { useEffect } from 'react';

import { Container } from 'semantic-ui-react';
import NavBar from '../NavBar.component';
import ActivityDashboard from '../activity/ActivityDashboard.component';
import Spinner from '../Spinner.component.';

import {fetchActivitiesStartAsync} from "../../reducers/activities/activities.action";
import {useDispatch, useSelector} from "react-redux";
import {selectIsLoading} from "../../reducers/activities/activities.selector";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchActivitiesStartAsync() as any);
    }, [dispatch]);

    const isLoading = useSelector(selectIsLoading);

  return (
    <>
      <NavBar />
      {(isLoading) ? <Spinner /> : (
          <Container style={{marginTop: '7em'}}>
            <ActivityDashboard />
          </Container>
      )}
    </>
  );
}

export default App;
