import "./HomePage.styles.scss";

import { useMobXStore } from "../../../app/stores/root.store";
import { observer } from "mobx-react-lite";

import { Link } from "react-router-dom";
import { ROUTES } from "../../../utils/contants.utils";

import {
    Button,
    Container,
    Header,
    Image,
    Segment
} from "semantic-ui-react";
import LoginForm from "../../authentfication/LoginForm.component";
import RegisterForm from "../../authentfication/RegisterForm.component";

const HomePage = () => {
    const { userStore, modalStore } = useMobXStore();

    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header inverted as='h1'>
                    <Image
                        size='massive'
                        src='assets/logo.png'
                        alt='logo'
                        style={{marginBottom: '.75rem'}}
                    />
                    Reactivities
                </Header>
                {(userStore.isLoggedIn) ? (
                    <>
                        <Header as='h2' inverted content='Welcome to Reactivities'/>
                        <Button as={Link} to={ROUTES.ACTIVITIES.LIST} size='huge' inverted>
                            Go to Activities!
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            onClick={() => modalStore.openModal(<LoginForm />)}
                            size='huge'
                            inverted
                            style={{marginRight: '2rem'}}
                        >
                            Login
                        </Button>
                        <Button
                            onClick={() => modalStore.openModal(<RegisterForm />)}
                            size='huge'
                            inverted
                        >
                            Register
                        </Button>
                    </>
                )}
            </Container>
        </Segment>
    );
};

export default observer(HomePage);