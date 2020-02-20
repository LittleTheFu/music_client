import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';

// const useStyles = makeStyles({
//     list: {
//         width: 250,
//     },
//     fullList: {
//         width: 'auto',
//     },
// });

interface DrawerProps {
    drawerOpen: boolean;
    closeDrawer: () => void;
}

export const TemporaryDrawer: React.FC<DrawerProps> = (props: DrawerProps) => {
    // const classes = useStyles();
    const { drawerOpen, closeDrawer } = props;

    return (
        <div>
            <Drawer anchor="right" open={drawerOpen} onClose={closeDrawer}>
                <h1>hello...........</h1>{' '}
            </Drawer>
        </div>
    );
};
