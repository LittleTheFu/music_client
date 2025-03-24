import React from 'react';
import { useNavigate } from 'react-router-dom';
// 修改前
// import { Button } from '@material-ui/core';
// import ArrowBack from '@material-ui/icons/ArrowBack';

// 修改后
// 移除未使用的导入
// import { Button } from '@mui/material';
// import ArrowBack from '@mui/icons-material/ArrowBack';

// 添加缺失的导入
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

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
