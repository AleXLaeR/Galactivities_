import { Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { observer } from "mobx-react-lite";
import { ROUTES } from "../utils/contants.utils";

import { Button, Container, Menu } from 'semantic-ui-react';

const NavBar = () => (
    <>
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                        Reactivities
                </Menu.Item>
                <Menu.Item as={NavLink} to={ROUTES.ACTIVITIES.LIST} name='Activities'/>
                <Menu.Item>
                    <Button as={NavLink} to={ROUTES.ACTIVITIES.CREATE} positive content='Create Activity'/>
                </Menu.Item>
            </Container>
        </Menu>
        <Outlet/>
    </>
);

export default observer(NavBar);