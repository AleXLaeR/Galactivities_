import {Card, Header, Image, Tab} from "semantic-ui-react";
import {ProfileImage} from "../../models/Image.model";

interface Props {
    images: ProfileImage[];
}

const ProfileImages = ({ images }: Props) => (
    <Tab.Pane>
        <Header icon='image' content='Photos' />
        {(images?.length !== 0) ? (
            <Card.Group itemsPerRow={5}>
                {images.map(image => (
                    <Card key={image.id}>
                        <Image src={image.uri || '/assets/user.png'} />
                    </Card>
                ))}
            </Card.Group>
        ) : (
            <Header
                as='h3'
                content='Nothing to show here'
                textAlign='center'
                style={{marginTop: '3.5rem'}}
            />
        )}
    </Tab.Pane>
);

export default ProfileImages;

