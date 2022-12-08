import './App.styles.scss';
import 'react-toastify/dist/ReactToastify.min.css';

import { useEffect } from "react";

import  { observer } from "mobx-react-lite";
import { useMobXStore } from "app/stores/root.store";

import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import { ROUTES } from "app/common/contants";

import NavBar from 'app/layout/nav-bar/NavBar.component';
import HomePage from "features/home/HomePage.component";
import Spinner from "app/common/components/loaders/Spinner.component";

import { Container } from "semantic-ui-react";
import { ToastContainer } from "react-toastify";
import ModalContainer from "app/common/components/modals/ModalContainer.component";

const App = () => {
    const location = useLocation();
    const { commonStore, userStore } = useMobXStore();

    useEffect(() => {
        if (commonStore.jwtToken) {
            userStore.getUser().finally(() => commonStore.setAppLoaded())
        } else {
            commonStore.setAppLoaded();
        }
    }, [commonStore, userStore]);

    if (!commonStore.appLoaded)
        return <Spinner />;

    return (
        <>
            <ScrollRestoration />
            <ToastContainer position='bottom-right' />
            <ModalContainer />
            {(location.pathname === ROUTES.BASE) ? <HomePage /> : (
                <>
                    <NavBar />
                    <Container style={{ marginTop: '6rem' }}>
                        <Outlet />
                    </Container>
                </>
            )}
        </>
    );
};

export default observer(App);
