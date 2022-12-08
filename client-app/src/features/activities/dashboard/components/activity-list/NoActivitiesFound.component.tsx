import { useMobXStore } from "app/stores/root.store";
import { Button, Container, Header, Icon, Segment } from "semantic-ui-react";

const NoActivitiesFound = () => {
    const { activityStore: { setFilter } } = useMobXStore();

    return (
        <Container style={{marginTop: '2rem'}}>
            <Segment placeholder textAlign='center' size='huge'>
                <Header icon>
                    <Icon name='frown outline'/>
                    Oops - no activities correspond to that filters!
                </Header>
                <Segment.Inline>
                    <Button onClick={() => setFilter('startDate', new Date())}>
                        Return to default list
                    </Button>
                </Segment.Inline>
            </Segment>
        </Container>
    );
}

export default NoActivitiesFound;