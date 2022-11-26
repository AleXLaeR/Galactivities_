import { useMobXStore } from "../../app/stores/root.store";
import { observer } from "mobx-react-lite";

import { Link, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { ROUTES } from "../../utils/contants.utils";

import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react';

const NavBar = () => {
    const { userStore } = useMobXStore();
    const { user, logout } = userStore;

    const DEFAULT_USER_IMAGE_URI = '/assets/user.png';

    return (
        <>
            <Menu inverted fixed='top'>
                <Container>
                    <Menu.Item as={NavLink} to='/' header>
                        <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}}/>
                        Galactivities
                    </Menu.Item>
                    <Menu.Item as={NavLink} to={ROUTES.ACTIVITIES.LIST} name='Activities'/>
                    <Menu.Item>
                        <Button as={NavLink} to={ROUTES.ACTIVITIES.CREATE} positive content='Create Activity'/>
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Image src={user?.imageUri || DEFAULT_USER_IMAGE_URI} avatar spaced='right'/>
                        <Dropdown pointing='top left' text={user?.displayName}>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    as={Link}
                                    to={`${ROUTES.PROFILE.BASE}/${user?.username}`}
                                    text='My Profile'
                                               con='user'
                                />
                                <Dropdown.Item onClick={logout} text='Logout' icon='power' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Item>
                </Container>
            </Menu>
            <Outlet/>
        </>
    );
};

export default observer(NavBar);