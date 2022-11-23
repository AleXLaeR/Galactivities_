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
import ActivityForm from "../form/ActivityForm.component";
import { ToastContainer } from "react-toastify";
import NotFound from "../routes/NotFound.component";
import LoginForm from "../authentfication/LoginForm.component";
import ModalContainer from "../modals/ModalContainer.component";
import Unauthorized from "../routes/Unauthorized.component";

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
            <ToastContainer position='bottom-right' hideProgressBar />
            <ModalContainer />
            <Routes>
                <Route index element={<HomePage />}/>
                <Route path='/' element={<NavBar />}>
                    <Route path={ROUTES.ACCOUNT.LOGIN} element={<LoginForm />}/>
                    <Route path={ROUTES.ACTIVITIES.LIST} element={<ActivityDashboard />}/>
                    <Route path={`${ROUTES.ACTIVITIES.LIST}/:id`} element={<ActivityDetails />}/>
                    <Route path={ROUTES.ACTIVITIES.CREATE} element={<ActivityForm />}/>
                    <Route path={`${ROUTES.ACTIVITIES.EDIT}/:id`} element={<ActivityForm />}/>
                    <Route path={ROUTES.ERROR.UNAUTHORIZED} element={<Unauthorized />}/>
                    <Route path='*' element={<NotFound />}/>
                </Route>
            </Routes>

        </>

    );
};

export default observer(App);
