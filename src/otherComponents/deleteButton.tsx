import React from 'react';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

interface DeleteButtonProps {
    clickDelete: () => void;
}

export const DeleteButton: React.FC<DeleteButtonProps> = (props: DeleteButtonProps) => {
    const { clickDelete } = props;
    return (
        <IconButton
            onClick={(): void => {
                clickDelete();
            }}
        >
            <DeleteIcon></DeleteIcon>
        </IconButton>
    );
};
