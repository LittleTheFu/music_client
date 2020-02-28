import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import { useGlobal } from 'reactn';

// const useStyles = makeStyles({
//     list: {
//         width: 250,
//     },
//     fullList: {
//         width: 'auto',
//     },
// });

// interface DrawerProps {
//     drawerOpen: boolean;
//     closeDrawer: () => void;
// }

export const TemporaryDrawer: React.FC = () => {
    // const classes = useStyles();
    const [drawerOpen, setDrawerOpen] = useGlobal('drawerOpen');

    return (
        <div>
            <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={(): void => {
                    setDrawerOpen(false);
                }}
            >
                <h1>hello...........</h1>{' '}
            </Drawer>
        </div>
    );
};
