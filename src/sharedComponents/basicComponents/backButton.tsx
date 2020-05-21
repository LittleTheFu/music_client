import React from 'react';
import { useHistory } from 'react-router-dom';
import { IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

export const BackButton: React.FC = () => {
    const history = useHistory();

    const backClick = (): void => {
        history.goBack();
    };

    return (
        <IconButton onClick={backClick}>
            <ArrowBackIcon></ArrowBackIcon>
        </IconButton>
    );
};
