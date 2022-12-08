import { Link } from "react-router-dom";
import { ROUTES } from "app/common/contants";

import { Button, Header, Icon, Segment } from "semantic-ui-react";

const Unauthorized = () => (
    <Segment placeholder textAlign='center' size='huge'>
        <Header icon>
            <Icon name='copyright outline' />
            Oops - looks like you do not have access to this page!
        </Header>
        <Segment.Inline>
            <Button as={Link} to={ROUTES.ACTIVITIES.LIST} primary>
                Return to activities page
            </Button>
        </Segment.Inline>
    </Segment>
);

export default Unauthorized;