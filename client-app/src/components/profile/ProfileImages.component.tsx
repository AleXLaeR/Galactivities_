import {Button, Card, Grid, Header, Image, Tab} from "semantic-ui-react";
import {ProfileImage} from "../../models/Image.model";
import {useMobXStore} from "../../app/stores/root.store";
import {useState} from "react";
import ImageUploadWidget from "../image-upload/ImageUploadWidget.component";

interface Props {
    images: ProfileImage[];
}

const ProfileImages = ({ images }: Props) => {
    const [addPhotoMode, setAddPhotoMode] = useState(false);

    const { profileStore } = useMobXStore();
    const { isCurrentStoredUser, uploadImage, isUploading } = profileStore;

    const handleImageUpload = (file: Blob) => {
        uploadImage(file).then(() => setAddPhotoMode(false));
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
                                    {images.map(image => (
                                        <Card key={image.id}>
                                            <Image src={image.uri || '/assets/user.png'}/>
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

export default ProfileImages;

