import {Grid, Header} from "semantic-ui-react";

const ImageUploadWidget = () => (
    <Grid>
        <Grid.Column width={4}>
            <Header sub color='teal' content='Step 1 - Add photo' />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
            <Header sub color='teal' content='Step 2 - Resize image' />
        </Grid.Column>
        <Grid.Column width={1} />
        <Grid.Column width={4}>
            <Header sub color='teal' content='Step 3 - Preview & Upload' />
        </Grid.Column>
    </Grid>
);

export default ImageUploadWidget;