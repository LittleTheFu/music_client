import React, { useState, useEffect } from 'react';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        inputRoot: {
            paddingTop: 30,
        },
        inputBox: {
            border: '1px solid grey',
            width: '60%',
            marginLeft: 'auto',
            marginRight: 'auto',
            display: 'block',
            borderRadius: theme.shape.borderRadius,
        },
        inputInput: {
            paddingLeft: 4,
        },
    }),
);

export const SearchPage: React.FC = () => {
    const classes = useStyles();

    return (
        <Grid container>
            <Grid item xs={12} className={classes.inputRoot}>
                <InputBase
                    classes={{
                        input: classes.inputInput,
                        root: classes.inputBox,
                    }}
                    placeholder="Search…"
                    inputProps={{ 'aria-label': 'search' }}
                />
            </Grid>
        </Grid>
    );
};
