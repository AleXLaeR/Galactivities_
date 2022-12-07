import { observer } from "mobx-react-lite";
import { useMobXStore } from "app/stores/root.store";

import { APP_NAME, IMAGE_URIS, ROUTES } from "app/common/contants";

import { Link, Outlet } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button, Container, Dropdown, Image, Menu } from 'semantic-ui-react';

const NavBar = () => {
    const { userStore: { user, logout } } = useMobXStore();

    return (
        <>
            <Menu inverted fixed='top'>
                <Container>
                    <Menu.Item as={NavLink} to='/' header>
                        <img src={IMAGE_URIS.MAIN_LOGO} alt="logo" style={{marginRight: '10px'}}/>
                        {APP_NAME}
                    </Menu.Item>
                    <Menu.Item as={NavLink} to={ROUTES.ACTIVITIES.LIST} name='Activities'/>
                    <Menu.Item>
                        <Button as={NavLink} to={ROUTES.ACTIVITIES.CREATE} positive content='Create Activity'/>
                    </Menu.Item>
                    <Menu.Item position='right'>
                        <Image src={user?.imageUri || IMAGE_URIS.USER_DEFAULT} avatar spaced='right'/>
                        <Dropdown pointing='top left' text={user?.displayName}>
                            <Dropdown.Menu>
                                <Dropdown.Item
                                    as={Link}
                                    to={`${ROUTES.PROFILE.BASE}/${user?.username}`}
                                    text='My Profile'
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