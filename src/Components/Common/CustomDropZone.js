import React from "react";
import { useDropzone } from "react-dropzone";

const CustomDropZone = (props) => {
    const { acceptedFiles, getRootProps, getInputProps } = useDropzone({
        maxFiles: 1,
        accept: '.json',
        onDrop: (acceptedFiles) => {
            handleSelect(acceptedFiles)
        }
    })

    const handleSelect = (acceptedFiles) => {
        const file = acceptedFiles[0];
        readFile(file, props.callback);
    }

    const readFile = async (file, callback) => {
        const reader = new FileReader();
        reader.onload = () => {
            const content = reader.result;
            const jsonContent = JSON.parse(content)
            callback(jsonContent);
        } 
        reader.readAsText(file);
    }

    return (
        <div style={{width: 500}} className="d-flex flex-column align-items-center">
            <div {...getRootProps({ className: 'dropzone' })}>
                <input {...getInputProps()} />
                <p className="text-center">Drag and drop a file, or click to select a file</p>
            </div>
        </div>
    )
}

export default CustomDropZone;