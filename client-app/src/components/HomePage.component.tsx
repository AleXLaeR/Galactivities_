import { Link } from "react-router-dom";
import { ROUTES } from "../utils/contants.utils";

import { Container } from "semantic-ui-react";

const HomePage = () => (
    <Container style={{marginTop: '6rem'}}>
        <h1>Home page</h1>
        <h2>Go to <Link to={ROUTES.ACTIVITIES.LIST} >Activities</Link></h2>
    </Container>
);

export default HomePage;