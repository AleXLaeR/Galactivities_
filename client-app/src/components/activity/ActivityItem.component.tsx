import {Activity} from "../../models/activity";
import {Button, Item, Label} from "semantic-ui-react";
import React, {SyntheticEvent, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {selectActivities} from "../../reducers/activities/activities.selector";
import {selectIsSubmitMode} from "../../reducers/state/state.selector";
import {setEditMode, setSubmitMode} from "../../reducers/state/state.action";
import agent from "../../api/agent";
import {setActivities} from "../../reducers/activities/activities.action";
import {setSelectedActivityFromExisting} from "../../reducers/activity/activity.action";

interface Props {
    activity: Activity,
}

const ActivityItem = ({ activity }: Props) => {
    const dispatch = useDispatch();
    const [target, setTarget] = useState('');

    const activities = useSelector(selectActivities) as Activity[];

    const isSubmitMode = useSelector(selectIsSubmitMode);

    const handleActivityDelete = async (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(e.currentTarget.name);
        dispatch(setSubmitMode(true));

        await agent.Activities.delete(id);

        dispatch(setActivities([...activities.filter(x => x.id !== id)]));
        dispatch(setSubmitMode(false));
    }

    const handleActivitySelect = (id: string) => {
        dispatch(setSelectedActivityFromExisting(id, activities));
        dispatch(setEditMode(false));
    }

    return (
        <Item key={activity.id}>
            <Item.Content>
                <Item.Header as='a'>{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>
                    <div>{activity.description}</div>
                    <div>{activity.location}, {activity.venue}</div>
                </Item.Description>
                <Item.Extra>
                    <Button
                        onClick={() => handleActivitySelect(activity.id)}
                        floated='right'
                        content='View'
                        color='blue'
                    />
                    <Button
                        name={activity.id}
                        loading={isSubmitMode && target === activity.id}
                        onClick={(e) => handleActivityDelete(e, activity.id)}
                        floated='right'
                        content='Delete'
                        color='red'
                    />
                    <Label basic content={activity.category}/>
                </Item.Extra>
            </Item.Content>
        </Item>
    );
};

export default ActivityItem;