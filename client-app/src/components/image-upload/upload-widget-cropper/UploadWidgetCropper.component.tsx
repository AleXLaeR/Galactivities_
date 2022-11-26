import 'cropperjs/dist/cropper.css';
import './UploadWidgetCropper.styles.scss';

import { Cropper } from "react-cropper";

interface Props {
    imagePreview: string;
    setCropper: (cropper: Cropper) => void;
}

const UploadWidgetCropper = ({ imagePreview, setCropper }: Props) => (
    <Cropper
        src={imagePreview}
        style={{height: '200px', width: '100%', borderRadius: '6px'}}
        initialAspectRatio={3}
        aspectRatio={1}
        preview='.img-preview'
        guides={false}
        viewMode={1}
        autoCropArea={1}
        background={false}
        onInitialized={cropper => setCropper(cropper)}
    />

);

export default UploadWidgetCropper;