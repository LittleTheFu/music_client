import React, { useState, useEffect } from 'react';
import Divider from '@material-ui/core/Divider';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
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
