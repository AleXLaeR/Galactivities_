import { useState } from "react";

import { observer } from "mobx-react-lite";
import { useMobXStore } from "app/stores/root.store";

import { UserProfile } from "models/users/UserProfile";
import Viewer from "react-viewer";

import { Button, Card, Grid, Header, Tab } from "semantic-ui-react";
import ImageUploadWidget from "features/image-upload/components/ImageUploadWidget.component";
import ProfilePhotoItem from "./ProfilePhotoItem.component";

interface Props {
    profile: UserProfile;
}

const ProfilePhotos = ({ profile: { images } }: Props) => {
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [visible, setVisible] = useState(false);

    const { profileStore } = useMobXStore();
    const { isActiveUserStored, uploadImage, isUploading } = profileStore;

    const handleImageUpload = async (file: Blob) => {
        await uploadImage(file);
        setAddPhotoMode(false);
    }

    return (
        <Tab.Pane style={{borderRadius: '6px'}}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='image' content='Photos' />
                    {isActiveUserStored && (
                        <Button
                            floated='right'
                            basic
                            content={addPhotoMode ? 'Cancel' : 'Add Photo'}
                            onClick={() => setAddPhotoMode(!addPhotoMode)}
                        />
                    )}
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <ImageUploadWidget uploadImage={handleImageUpload} loading={isUploading} />
                    ) : (
                        <>
                            {(images?.length !== 0) ? (
                                <Card.Group itemsPerRow={4}>
                                    <Viewer
                                        visible={visible}
                                        onClose={() => setVisible(false)}
                                        images={images.map(image => ({src: image.uri}))}
                                    />
                                    {images.map(image => (
                                        <ProfilePhotoItem
                                            key={image.id}
                                            photo={image}
                                            onImgClick={() => setVisible(true)}
                                        />
                                    ))}
                                </Card.Group>
                            ) : (
                                <Header
                                    as='h3'
                                    content='Nothing to show here'
                                    textAlign='center'
                                    style={{marginTop: '1rem'}}
                                />
                            )}
                        </>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    );
};

export default observer(ProfilePhotos);

