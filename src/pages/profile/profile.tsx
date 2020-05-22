import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { uploadAvatar } from '../../common/service';
import { setMeAvatar, getMeAvatar } from '../../globals';
import { RetUpdateAvatarDto } from '../../common/interface';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles } from '@material-ui/core/styles';
// import { openHint } from '../../globals';
import { useDispatch } from 'reactn';

const useStyles = makeStyles(() =>
    createStyles({
        btnGroup: {
            display: 'block',
        },
        img: {
            width: 80,
            height: 80,
        },
    }),
);

export const ProfilePage: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(getMeAvatar());
    const [size, setSize] = useState(0);

    const openTheHint = useDispatch('openHint');
    const classes = useStyles({});

    const MAX_SIZE = 10 * 1024;

    useEffect(() => {
        if (!selectedFile) {
            // setPreview(undefined);
            return;
        }

        setSize(selectedFile.size);
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

        if (size > MAX_SIZE) {
            openTheHint('file too large');
            return;
        }

        const formData = new FormData();
        formData.append('avatar', selectedFile);

        uploadAvatar(
            formData,
            o => {
                const obj = o as RetUpdateAvatarDto;
                setMeAvatar(obj.remoteUrl);
                openTheHint('successed!');
            },
            e => {
                console.log(e);
            },
        );
    };

    return (
        <div>
            <h1>Choose a img, at most 10KB</h1>
            <h1>size: {size / 1024}KB</h1>
            <img src={preview} className={classes.img} alt="avatar" />
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
