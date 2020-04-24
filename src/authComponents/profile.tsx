import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import Button from '@material-ui/core/Button';
import { uploadAvatar } from '../service';
import { setMeAvatar } from '../globals';
import { RetUpdateAvatarDto } from '../dataInterfaces/music';

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

        return (): void => URL.revokeObjectURL(objectUrl);
    }, [selectedFile]);

    const onSelectFile = (e: React.ChangeEvent<HTMLInputElement>): void => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }

        setSelectedFile(e.target.files[0]);
    };

    const uploadFile = (): void => {
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('avatar', selectedFile);

        uploadAvatar(
            formData,
            o => {
                const obj = o as RetUpdateAvatarDto;
                setMeAvatar(obj.remoteUrl);
            },
            e => {},
        );
    };

    return (
        <div>
            <h1>Name : {userId}</h1>
            <input accept="image/*" id="contained-button-file" type="file" onChange={onSelectFile} name="avatar" />
            {selectedFile && <img src={preview} />}

            <Button variant="contained" color="primary" component="span" onClick={uploadFile}>
                Upload
            </Button>
        </div>
    );
};
