import {UserProfile} from "../../models/UserProfile.model";
import {observer} from "mobx-react-lite";
import {Button, Reveal} from "semantic-ui-react";
import {useMobXStore} from "../../app/stores/root.store";
import {SyntheticEvent} from "react";


interface Props {
    profile: UserProfile;
    inBtnGroup?: boolean;
}

const FollowButton = ({ profile, inBtnGroup = false }: Props) => {
    const { profileStore, userStore: { user } } = useMobXStore();
    const { updateFollowing, isLoading } = profileStore;

    const handleFollow = async (e: SyntheticEvent<HTMLButtonElement>, username: string) => {
        e.preventDefault();
        await updateFollowing(username, !profile.isFollowing);
    }

    return (
        inBtnGroup ? (
            <Button
                color={profile.isFollowing ? 'red' : 'green'}
                content={profile.isFollowing ? 'Unfollow' : 'Follow'}
            />
            ) : (
            <Reveal animated='move'>
                <Reveal.Content disabled={user?.username === profile.username} visible style={{width: '100%'}}>
                    <Button
                        fluid
                        color='teal'
                        content={profile.isFollowing ? 'Following' : 'Not Following'
                    }/>
                </Reveal.Content>
                <Reveal.Content hidden style={{width: '100%'}}>
                    <Button
                        fluid
                        basic
                        color={profile.isFollowing ? 'red' : 'green'}
                        content={profile.isFollowing ? 'Unfollow' : 'Follow'}
                        disabled={user?.username === profile.username}
                        loading={isLoading}
                        onClick={e => handleFollow(e, profile.username)}
                    />
                </Reveal.Content>
            </Reveal>
    ));
}

export default observer(FollowButton);