import {useEffect, useState} from "react";

import { observer } from "mobx-react-lite";
import  { useMobXStore } from "../../../app/stores/root.store";

import { PagingParams } from "../../../models/pagination";

import ActivityFilters from "./filters/ActivityFilters.component";
import {Button, Container, Grid, Header, Icon, Loader, Segment} from 'semantic-ui-react';
import ActivityList from './ActivityList.component';
import InfiniteScroll from "react-infinite-scroller";

import ActivityItemPlaceholder from "./ActivityItemPlaceholder.component";

const FilterStyles = {
    top: '5rem',
    position: 'sticky',
    alignSelf: 'flex-start',
}

const ActivityDashboard = () => {
    const [loadingNext, setLoadingNext] = useState(false);

    const { activityStore } = useMobXStore();
    const { fetchActivities, setFilter, isLoadingInitial, activityRegistry, pagination, setPagingParams } = activityStore;

    useEffect(() => {
        activityStore.fetchActivities().then(() => {});
    }, [activityStore]);

    const handleGetNext = async () => {
        setLoadingNext(true);

        setPagingParams(new PagingParams(pagination!.currentPage + 1));
        await fetchActivities(false);

        setLoadingNext(false);
    }

    return (
        <Container style={{marginTop: '6rem'}}>
            <Grid>
                <Grid.Column width='10'>
                    {(activityStore.isLoadingInitial && !loadingNext) ? (
                        <>
                            <ActivityItemPlaceholder />
                            <ActivityItemPlaceholder />
                        </>
                    ) : (
                        <>
                            {(activityRegistry.size === 0) ? (
                                <Container style={{marginTop: '2rem'}}>
                                    <Segment placeholder textAlign='center' size='huge'>
                                        <Header icon>
                                            <Icon name='frown outline' />
                                            Oops - no activities correspond to that filters!
                                        </Header>
                                        <Segment.Inline>
                                            <Button onClick={() => setFilter('startDate', new Date())}>
                                                Return to default list
                                            </Button>
                                        </Segment.Inline>
                                    </Segment>
                                </Container>
                            ) : (
                                <InfiniteScroll
                                    pageStart = {0}
                                    loadMore={handleGetNext}
                                    hasMore={!isLoadingInitial && !!pagination
                                        && pagination.currentPage < pagination.totalPages}
                                    initialLoad={false}
                                >
                                    <ActivityList />
                                </InfiniteScroll>
                            )}
                        </>
                    )}
                </Grid.Column>
                <Grid.Column width='6' style={FilterStyles}>
                    <ActivityFilters />
                </Grid.Column>
                <Grid.Column width={10}>
                    <Loader active={loadingNext} />
                </Grid.Column>
            </Grid>
        </Container>
    );
};

export default observer(ActivityDashboard);