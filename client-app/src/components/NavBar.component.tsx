import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import {useDispatch} from "react-redux";
import {setEditMode} from "../reducers/state/state.action";

export default function NavBar() {
    const dispatch = useDispatch();

    const handleFormOpen = () =>
        dispatch(setEditMode(true));

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