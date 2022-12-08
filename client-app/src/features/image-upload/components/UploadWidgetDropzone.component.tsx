import { useCallback } from "react";
import { useDropzone } from "react-dropzone";

import { Header, Icon } from "semantic-ui-react";

interface Props {
    setFiles: <T extends File> (files: T[]) => void;
}

const dropzoneStyles = {
    border: 'dashed 3px #EEE',
    borderColor: '#EEE',
    borderRadius: '6px',
    paddingTop: '2rem',
    textAlign: 'center' as 'center',
    height: '200px',
}

const activeDropzoneStyles = {
    borderColor: 'green'
}

const UploadWidgetDropzone = ({ setFiles }: Props) => {
    const onDrop = useCallback((acceptedFiles: any) => {
        setFiles(acceptedFiles.map((file: any) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
    }, [setFiles]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({onDrop});

    return (
        <div {...getRootProps()}
             style={isDragActive ? {...dropzoneStyles, ...activeDropzoneStyles} : dropzoneStyles}
        >
            <input {...getInputProps()} />
                <Icon name='upload' size='huge' />
                <Header content={isDragActive ? 'Drop it' : 'Drop images here'} />
        </div>
    )
}

export default UploadWidgetDropzone;