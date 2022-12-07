import './App.styles.scss';
import 'react-toastify/dist/ReactToastify.min.css';

import { useEffect } from "react";

import  { observer } from "mobx-react-lite";
import { useMobXStore } from "app/stores/root.store";

import { Route, Routes } from "react-router-dom";
import { ROUTES } from "app/common/contants";

import NavBar from 'app/layout/nav-bar/NavBar.component';
import HomePage from "features/home/HomePage.component";
import Spinner from "app/common/components/loaders/Spinner.component";

import { ToastContainer } from "react-toastify";
import ModalContainer from "app/common/components/modals/ModalContainer.component";

import ActivityDashboard from "features/activities/dashboard/components/ActivityDashboard.component";
import ActivityDetails from "features/activities/details/ActivityDetails.component";
import ActivityForm from "features/activities/form/ActivityForm.component";
import ProfilePage from "features/profiles/components/ProfilePage.component";

import { NotFound, Unauthorized } from "features/errors";

const App = () => {
    const { commonStore, userStore } = useMobXStore();

    useEffect(() => {
        if (commonStore.jwtToken) {
            userStore.getUser().finally(() => commonStore.setAppLoaded())
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore]);

    if (!commonStore.appLoaded)
        return <Spinner content='Loading app...' />

    return (
        <>
            <ToastContainer position='bottom-right' />
            <ModalContainer />
            <Routes>
                <Route index element={<HomePage />}/>
                <Route path='/' element={<NavBar />}>
                    <Route path={ROUTES.ACTIVITIES.LIST} element={<ActivityDashboard />}/>
                    <Route path={`${ROUTES.ACTIVITIES.LIST}/:id`} element={<ActivityDetails />}/>
                    <Route path={`${ROUTES.PROFILE.BASE}/:username`} element={<ProfilePage />}/>
                    <Route path={ROUTES.ACTIVITIES.CREATE} element={<ActivityForm />}/>
                    <Route path={`${ROUTES.ACTIVITIES.EDIT}/:id`} element={<ActivityForm />}/>
                    <Route path={ROUTES.ERROR.UNAUTHORIZED} element={<Unauthorized />} />
                    <Route path='*' element={<NotFound />} />
                </Route>
            </Routes>
        </>
    );
};

export default observer(App);
