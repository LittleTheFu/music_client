import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles'; // 引入 styled 函数
import { createCollection } from '../../common/service';
import { MusicCollection } from '../../common/interface';

// 使用 styled 组件替换 makeStyles
const StyledTextField = styled(TextField)({
  width: '100%',
});

const StyledButton = styled(Button)({
  width: '100%',
});

interface CreateCollectionModalProps {
    modalOpen: boolean;
    modalClose: () => void;
    addToCollections: (collection: MusicCollection) => void;
}

export const CreateCollectionModal: React.FC<CreateCollectionModalProps> = (props: CreateCollectionModalProps) => {
    const [content, setContent] = useState('');
    const { modalOpen, modalClose, addToCollections } = props;

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        createCollection(
            content,
            o => {
                addToCollections(o);
            },
            console.log,
        );
        modalClose();
    };

    return (
        <Dialog
            aria-labelledby="simple-dialog-title"
            onClose={(): void => {
                modalClose();
            }}
            open={modalOpen}
        >
            <Grid container>
                <Grid item xs={12}>
                    <form onSubmit={handleSubmit} noValidate autoComplete="off">
                        <StyledTextField
                            id="standard-basic"
                            label="name"
                            onChange={(e): void => {
                                setContent(e.target.value);
                            }}
                        />
                        <StyledButton type="submit" variant="contained" color="primary">
                            create
                        </StyledButton>
                    </form>
                </Grid>
            </Grid>
        </Dialog>
    );
};
