import React, { useState, useEffect } from 'react';
import { useGlobal } from 'reactn';
import Button from '@material-ui/core/Button';
import { uploadAvatar } from '../service';
import { setMeAvatar } from '../globals';
import { RetUpdateAvatarDto } from '../dataInterfaces/music';

export const ProfilePage: React.FC = () => {
    const [userId] = useGlobal('userId');
    // const updateTheAvatar = useDispatch(updateAvatar);
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

    const uploadFile = (): void => {
        // if (!e.target.files || e.target.files.length === 0) {
        //     setSelectedFile(undefined);
        //     return;
        // }
        if (!selectedFile) return;

        const formData = new FormData();
        formData.append('avatar', selectedFile);
        console.log(formData.getAll('avatar'));
        console.log('after append');
        console.log(formData);

        uploadAvatar(
            formData,
            o => {
                const obj = o as RetUpdateAvatarDto;
                setMeAvatar(obj.remoteUrl);
                console.log(o);
            },
            e => {
                console.log(e);
            },
        );
        // console.log(selectedFile);

        console.log('UPLOAD FILE');
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
