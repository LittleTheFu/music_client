import React from 'react';
// import { makeStyles, createStyles } from '@material-ui/core/styles';

// 修改后
import { makeStyles, createStyles } from '@mui/styles';

const useStyles = makeStyles(() =>
    createStyles({
        devider: {
            paddingTop: 10,
            paddingBottom: 10,
            borderBottom: '2px solid grey',
        },
    }),
);

export const MainDivider: React.FC = () => {
    const classes = useStyles({});

    return <div className={classes.devider}></div>;
};
