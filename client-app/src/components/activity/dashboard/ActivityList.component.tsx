import { useMobXStore } from "../../../app/stores/root.store";
import { observer } from "mobx-react-lite";

import { format } from "date-fns";

import { Fragment } from "react";
import { Header } from 'semantic-ui-react';
import ActivityItem from "./ActivityItem.component";

const ActivityList = () => {
    const { activityStore } = useMobXStore();
    const { groupedActivities } = activityStore;

    return (
        <Fragment>
            {groupedActivities.map(([group, activities]) => (
                <Fragment key={group}>
                    <Header sub color='violet' size='huge' style={{fontSize: '1.2rem'}}>
                        {format(Date.parse(group), 'dd MMM yyyy')}
                    </Header>
                    {activities.map(activity => (
                        <ActivityItem key={activity.id} activity={activity} />
                    ))}
                </Fragment>
            ))}
        </Fragment>
    );
}

export default observer(ActivityList);