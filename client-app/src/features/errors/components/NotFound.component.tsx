import { Link } from "react-router-dom";
import { ROUTES } from "app/common/contants";

import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";

const NotFound = () => (
    <Container style={{marginTop: '6rem'}}>
        <Segment placeholder textAlign='center' size='huge'>
            <Header icon>
                <Icon name='search'/>
                Oops - we've looked everywhere and could not find your request.
            </Header>
            <Segment.Inline>
                <Button as={Link} to={ROUTES.ACTIVITIES.LIST} primary>
                    Return to activities page
                </Button>
            </Segment.Inline>
        </Segment>
    </Container>
);

export default NotFound;