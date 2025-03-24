import React from 'react';
import { useNavigate } from 'react-router-dom';
// 修改前
// import { Button } from '@material-ui/core';
// import ArrowBack from '@material-ui/icons/ArrowBack';

// 修改后
import { Button } from '@mui/material';
import ArrowBack from '@mui/icons-material/ArrowBack';

export const BackButton: React.FC = () => {
    const navigate = useNavigate();

    const backClick = (): void => {
        navigate(-1);
    };

    return (
        <IconButton onClick={backClick}>
            <ArrowBackIcon></ArrowBackIcon>
        </IconButton>
    );
};
