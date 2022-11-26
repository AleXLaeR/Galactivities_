import { Button, ButtonGroup, Grid, Header } from "semantic-ui-react";
import UploadWidgetDropzone from "./UploadWidgetDropzone.component";
import { useEffect, useState } from "react";
import UploadWidgetCropper from "./upload-widget-cropper/UploadWidgetCropper.component";

const ImageUploadWidget = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [cropper, setCropper] = useState<Cropper>();

    const onCrop = () => {
        if (cropper) {
            cropper.getCroppedCanvas().toBlob(blob => console.log(blob));
        }
    }

    useEffect(() => {
        return () => {
            files.forEach((file: any) => URL.revokeObjectURL(file.preview))
        };
    }, [files]);

    return (
        <Grid style={{marginLeft: '.25rem', textAlign: 'center'}}>
            <Grid.Column width={4}>
                <Header as='h4' color='teal' content='Step 1 - Add photo' />
                <UploadWidgetDropzone setFiles={setFiles} />
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={5}>
                <Header as='h4' color='teal' content='Step 2 - Resize image' />
                {files && files.length !== 0 && (
                        <UploadWidgetCropper setCropper={setCropper} imagePreview={(files[0] as any).preview} />
                )}
            </Grid.Column>
            <Grid.Column width={1} />
            <Grid.Column width={5}>
                <Header as='h4' color='teal' content='Step 3 - Preview' />
                {files && files.length !== 0 && (
                    <>
                        <div className='img-preview' />
                        <Button onClick={() => setFiles([...files, ])} content='default' />
                        <ButtonGroup widths={1}>
                            <Button onClick={onCrop} positive icon='check' />
                            <Button onClick={() => setFiles([])} icon='close' />
                        </ButtonGroup>
                    </>
                )}
            </Grid.Column>
        </Grid>
    );
};

export default ImageUploadWidget;