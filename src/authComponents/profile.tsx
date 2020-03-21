import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import Button from '@material-ui/core/Button';

export const ProfilePage: React.FC = () => {
    const [userId] = useGlobal('userId');
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState('');

    useEffect(() => {
        if (!selectedFile) {
            setPreview(undefined);
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile);
        setPreview(objectUrl);

        // free memory when ever this component is unmounted
        return (): void => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(e.target.files[0]);
    };

    return (
        <div>
            <h1>Name : {userId}</h1>
            <input accept="image/*" id="contained-button-file" type="file" onChange={onSelectFile} />
            {selectedFile && <img src={preview} />}

            <label htmlFor="contained-button-file">
                <Button variant="contained" color="primary" component="span">
                    Upload
                </Button>
            </label>
        </div>
    );
};
