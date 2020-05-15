import React from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    text: {
        textAlign: 'center',
    },
});

export const SourceCodePage: React.FC = () => {
    const classes = useStyles({});

    return (
        <div>
            <Link className={classes.text} href="https://github.com/LittleTheFu/music_client" target="_blank">
                <h1>Client Code</h1>
            </Link>
            <Link className={classes.text} href="https://github.com/LittleTheFu/music_server" target="_blank">
                <h1>Server Code</h1>
            </Link>
        </div>
    );
};
