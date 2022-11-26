import {Container, Grid, Header, Image} from "semantic-ui-react";
import UploadWidgetDropzone from "./UploadWidgetDropzone.component";
import { useState } from "react";

const centeredFlexStyles = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
}

const ImageUploadWidget = () => {
    const [files, setFiles] = useState<File[]>([]);

    return (
        <Grid>
            <Grid.Column width={4}>
                <Header as='h4' color='teal' content='Step 1 - Add photo' style={{marginLeft: '2rem'}} />
                <UploadWidgetDropzone setFiles={setFiles} />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={5}>
                <Header as='h4' color='teal' content='Step 2 - Resize image' style={{marginLeft: '3.5rem'}} />
                {files && files.length !== 0 && (
                    <Container style={centeredFlexStyles}>
                        <Image
                            src={(files[0] as any).preview}
                            style={{
                                paddingBottom: '-2rem',
                                height: '200px',
                                objectFit: 'contain'
                        }}
                        />
                    </Container>
                )}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={5}>
                <Header as='h4' color='teal' content='Step 3 - Preview & Upload' style={{marginLeft: '2rem'}} />
            </Grid.Column>
        </Grid>
    );
};

export default ImageUploadWidget;