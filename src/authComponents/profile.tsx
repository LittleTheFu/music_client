import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { uploadAvatar } from '../service';
import { setMeAvatar } from '../globals';
import { RetUpdateAvatarDto } from '../dataInterfaces/music';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        btnGroup: {
            display: 'block',
        },
    }),
);

export const ProfilePage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState('');

    const classes = useStyles({});

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
            <h1>Choose a img</h1>
            {selectedFile && <img src={preview} />}
            <div className={classes.btnGroup}>
                <IconButton component="label">
                    <input
                        accept="image/*"
                        id="contained-button-file"
                        type="file"
                        onChange={onSelectFile}
                        name="avatar"
                        style={{ display: 'none' }}
                    />
                    <CloudUploadIcon></CloudUploadIcon>
                </IconButton>
            </div>

            <Button variant="contained" color="primary" component="span" onClick={uploadFile}>
                OK
            </Button>
        </div>
    );
};
