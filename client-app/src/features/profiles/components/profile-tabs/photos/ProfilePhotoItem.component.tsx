import { useState, SyntheticEvent } from "react";

import { observer } from "mobx-react-lite";
import { useMobXStore } from "app/stores/root.store";

import { ProfileImage } from "models/users/UserProfile";
import { Button, Card, Image } from "semantic-ui-react";

interface Props {
    photo: ProfileImage;
    onImgClick?: (val: boolean) => void;
}

const ProfilePhotoItem = ({ photo, onImgClick }: Props) => {
    const [target, setTarget] = useState('');

    const { profileStore } = useMobXStore();
    const { isActiveUserStored, isUploading, setMainImage, deleteImage } = profileStore;

    const handleSetMainImage = async (image: ProfileImage, e: SyntheticEvent<HTMLButtonElement>) => {
        setTarget(e.currentTarget.name);
        await setMainImage(image);
    }

    const handleImageDelete = async (image: ProfileImage, e: SyntheticEvent<HTMLButtonElement>) => {
        setTarget(e.currentTarget.name);
        await deleteImage(image);
    }

    return (
        <Card>
            <Image
                src={photo.uri}
                style={{cursor: 'pointer'}}
                onClick={onImgClick}
            />
            {isActiveUserStored && (
                <Button.Group fluid widths={2}>
                    <Button
                        basic
                        color='green'
                        content='As Main'
                        name={'main.' + photo.id}
                        disabled={photo.isMain}
                        loading={(target === 'main.' + photo.id) && isUploading}
                        onClick={e => handleSetMainImage(photo, e)}
                    />
                    <Button
                        basic
                        color='red'
                        icon='trash'
                        name={photo.id}
                        disabled={photo.isMain}
                        loading={target === photo.id && isUploading}
                        onClick={(e) => handleImageDelete(photo, e)}
                    />
                </Button.Group>
            )}
        </Card>
    );
};

export default observer(ProfilePhotoItem);