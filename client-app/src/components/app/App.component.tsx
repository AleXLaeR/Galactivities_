import './App.styles.scss';
import { useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../../utils/contants.utils";

import { useMobXStore } from "../../app/stores/root.store";
import  { observer } from "mobx-react-lite";

import HomePage from "../HomePage.component";
import Spinner from "../Spinner.component.";

import NavBar from '../NavBar.component';
import ActivityDashboard from '../activity/ActivityDashboard.component';
import ActivityDetails from "../activity/ActivityDetails.component";
import ActivityForm from "../activity/ActivityForm.component";

const App = () => {
    const { activityStore } = useMobXStore();

    useEffect(() => {
        activityStore.fetchActivities()
            .then(() => console.log('Activities successfully fetched!'));
    }, [activityStore]);

    return (
        (activityStore.isLoadingInitial) ?
            <Spinner/> : (
                <Routes>
                    <Route index element={<HomePage />}/>
                    <Route path='/' element={<NavBar />}>
                        <Route path={ROUTES.ACTIVITIES.LIST} element={<ActivityDashboard />} />
                        <Route path={`${ROUTES.ACTIVITIES.LIST}/:id`} element={<ActivityDetails />}/>
                        <Route path={ROUTES.ACTIVITIES.CREATE} element={<ActivityForm />}/>
                        <Route path={`${ROUTES.CRUD.EDIT}/:id`} element={<ActivityForm />}/>
                    </Route>
                </Routes>
            )
    );
};

export default observer(App);
