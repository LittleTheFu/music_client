import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { uploadAvatar } from '../../common/service';
import { setMeAvatar, getMeAvatar } from '../../globals';
import { RetAvatar } from '../../common/interface';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { useDispatch } from 'reactn';
import AddPhotoAlternateIcon from '@material-ui/icons/AddPhotoAlternate';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            // border: '1px solid #000',
            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        addBtn: {
            display: 'inline-block',
            height: 80,
            width: 80,
        },
        img: {
            width: 80,
            height: 80,
        },
        imgGroup: {
            width: 160,
            // border: '1px solid #000',

            display: 'block',
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        okBtn: {
            display: 'block',
            width: 140,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
        message: {
            textAlign: 'center',
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

        uploadAvatar(formData, (o: RetAvatar): void => {
            setMeAvatar(o.remoteUrl);
            openTheHint('successed!');
        });
    };

    return (
        <div className={classes.root}>
            <h2 className={classes.message}>Choose a img, at most 10KB</h2>
            <h2 className={classes.message}>size: {size / 1024}KB</h2>
            <div className={classes.imgGroup}>
                <img src={preview} className={classes.img} alt="avatar" />
                <div className={classes.addBtn}>
                    <IconButton component="label">
                        <input
                            accept="image/*"
                            id="contained-button-file"
                            type="file"
                            onChange={onSelectFile}
                            name="avatar"
                            style={{ display: 'none' }}
                        />
                        <AddPhotoAlternateIcon></AddPhotoAlternateIcon>
                    </IconButton>
                </div>
            </div>

            <Button variant="contained" color="primary" component="span" onClick={uploadFile} className={classes.okBtn}>
                OK
            </Button>
        </div>
    );
};
