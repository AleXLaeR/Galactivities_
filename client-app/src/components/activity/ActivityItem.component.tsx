import {Activity} from "../../models/activity";
import {Button, Item, Label} from "semantic-ui-react";
import {SyntheticEvent, useState} from "react";
import {useMobXStore} from "../../app/stores/root.store";
import {observer} from "mobx-react-lite";

interface Props {
    activity: Activity,
}

const ActivityItem = ({ activity }: Props) => {
    const [target, setTarget] = useState('');

    const { activityStore } = useMobXStore();
    const { isSubmitMode, deleteActivity, onActivitySelect } = activityStore;

    const handleActivityDelete = async (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(e.currentTarget.name);
        await deleteActivity(id);
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
                        onClick={() => onActivitySelect(activity.id)}
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

export default observer(ActivityItem);