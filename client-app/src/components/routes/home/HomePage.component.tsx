import {Button, Container, Header, Image, Segment} from "semantic-ui-react";
import {Link} from "react-router-dom";
import {ROUTES} from "../../../utils/contants.utils";

import "./HomePage.styles.scss";

const HomePage = () => (
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
            <Header as='h2' inverted content='Welcome to Reactivities' />
            <Button as={Link} to={ROUTES.ACTIVITIES.LIST} size='huge' inverted>
                Take me to Activities!
            </Button>
        </Container>
    </Segment>
);

export default HomePage;