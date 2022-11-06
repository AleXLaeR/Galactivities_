import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import {useMobXStore} from "../app/stores/root.store";
import {observer} from "mobx-react-lite";

const NavBar = () => {
    const { activityStore } = useMobXStore();

    const handleFormOpen = () => activityStore.setEditMode(true);

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item header>
                    <img src="/assets/logo.png" alt="logo" style={{marginRight: '10px'}} />
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities' />
                <Menu.Item>
                    <Button onClick={handleFormOpen} positive content='Create Activity' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}

export default observer(NavBar);