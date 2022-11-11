import './App.styles.scss';
import 'react-toastify/dist/ReactToastify.min.css';

import { useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import { ROUTES } from "../../utils/contants.utils";

import { useMobXStore } from "../../app/stores/root.store";
import  { observer } from "mobx-react-lite";

import HomePage from "../routes/home/HomePage.component";
import Spinner from "../helpers/Spinner.component.";

import NavBar from '../routes/NavBar.component';
import ActivityDashboard from '../activity/dashboard/ActivityDashboard.component';
import ActivityDetails from "../activity/details/ActivityDetails.component";
import ActivityForm from "../activity/ActivityForm.component";
import { ToastContainer } from "react-toastify";
import NotFound from "../routes/NotFound.component";

const App = () => {
    const { activityStore } = useMobXStore();

    useEffect(() => {
        activityStore.fetchActivities().then(() => {});
    }, [activityStore]);

    return (
        <>
            <ToastContainer position='bottom-right' hideProgressBar />
            {(activityStore.isLoadingInitial) ?
                <Spinner/> : (
                    <Routes>
                        <Route index element={<HomePage />}/>
                        <Route path='/' element={<NavBar />}>
                            <Route path={ROUTES.ACTIVITIES.LIST} element={<ActivityDashboard />} />
                            <Route path={`${ROUTES.ACTIVITIES.LIST}/:id`} element={<ActivityDetails />}/>
                            <Route path={ROUTES.ACTIVITIES.CREATE} element={<ActivityForm />}/>
                            <Route path={`${ROUTES.CRUD.EDIT}/:id`} element={<ActivityForm />}/>
                            <Route path='*' element={<NotFound />}/>
                        </Route>
                    </Routes>
                )}
        </>

    );
};

export default observer(App);
