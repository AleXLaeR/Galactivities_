import {Button, Card, Grid, Header, Image, Tab} from "semantic-ui-react";
import {ProfileImage} from "../../models/Image.model";
import {useMobXStore} from "../../app/stores/root.store";
import {SyntheticEvent, useState} from "react";
import ImageUploadWidget from "../image-upload/ImageUploadWidget.component";
import {observer} from "mobx-react-lite";
import {UserProfile} from "../../models/UserProfile.model";
import Viewer from "react-viewer";

interface Props {
    profile: UserProfile;
}

const ProfileImages = ({ profile: { images } }: Props) => {
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState('');
    const [visible, setVisible] = useState(false);

    const { profileStore } = useMobXStore();
    const {
        isCurrentStoredUser,
        uploadImage,
        isUploading,
        setMainImage,
        deleteImage,
    } = profileStore;

    const handleImageUpload = (file: Blob) => {
        uploadImage(file).then(() => setAddPhotoMode(false));
    }

    const handleSetMainImage = async (image: ProfileImage, e: SyntheticEvent<HTMLButtonElement>) => {
        setTarget(e.currentTarget.name);
        await setMainImage(image);
    }

    const handleImageDelete = async (image: ProfileImage, e: SyntheticEvent<HTMLButtonElement>) => {
        setTarget(e.currentTarget.name);
        await deleteImage(image);
    }

    return (
        <Tab.Pane style={{borderRadius: '6px'}}>
            <Grid>
                <Grid.Column width={16}>
                    <Header floated='left' icon='image' content='Photos' />
                    {isCurrentStoredUser && (
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
                                <Card.Group itemsPerRow={5}>
                                    <Viewer
                                        visible={visible}
                                        onClose={() => setVisible(false)}
                                        images={images.map(image => ({src: image.uri}))}
                                    />
                                    {images.map(image => (
                                        <Card key={image.id}>
                                            <Image
                                                src={image.uri || '/assets/user.png'}
                                                style={{cursor: 'pointer'}}
                                                onClick={() => setVisible(true)}
                                            />
                                            {isCurrentStoredUser && (
                                                <Button.Group fluid widths={2}>
                                                    <Button
                                                        basic
                                                        color='green'
                                                        content='Main'
                                                        name={'main' + image.id}
                                                        disabled={image.isMain}
                                                        loading={(target === 'main' + image.id) && isUploading}
                                                        onClick={e => handleSetMainImage(image, e)}
                                                    />
                                                    <Button
                                                        basic
                                                        color='red'
                                                        icon='trash'
                                                        name={image.id}
                                                        disabled={image.isMain}
                                                        loading={target === image.id && isUploading}
                                                        onClick={(e) => handleImageDelete(image, e)}
                                                    />
                                                </Button.Group>
                                            )}
                                        </Card>
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

export default observer(ProfileImages);

