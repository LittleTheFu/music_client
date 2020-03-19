import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { useGlobal } from 'reactn';
import { Music } from '../dataInterfaces/music';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { blue } from '@material-ui/core/colors';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            position: 'absolute',
            width: 300,
            height: 300,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        avatar: {
            backgroundColor: blue[100],
            color: blue[600],
        },
    }),
);

export const CollectionInfoModal: React.FC = () => {
    const [collectionInfoModalOpen, setCollectionInfoModalOpen] = useGlobal('collectionInfoModalOpen');
    const [collectionInfoData] = useGlobal('collectionInfoData');
    const classes = useStyles({});

    const infoElements = collectionInfoData.map((music: Music, index: number) => {
        return <ListItem key={music.name}>{music.name}</ListItem>;
    });

    return (
        <Dialog
            onClose={(): void => {
                setCollectionInfoModalOpen(false);
            }}
            aria-labelledby="simple-dialog-title"
            open={collectionInfoModalOpen}
        >
            <DialogTitle id="simple-dialog-title">Content</DialogTitle>
            <List>
                <React.Fragment>{infoElements}</React.Fragment>
            </List>
        </Dialog>
    );
};
