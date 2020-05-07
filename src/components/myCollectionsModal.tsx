import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { MusicCollection } from '../dataInterfaces/music';
import { getPrivateMusicCollections } from '../service';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        cover: {
            padding: 5,
            height: 30,
        },
        paper: {
            width: 280,
        },
    }),
);

interface MyCollectionsModalProps {
    modalOpen: boolean;
    modalClose: () => void;
    mixClick: (collectionId: number) => void;
}

export const MyCollectionsModal: React.FC<MyCollectionsModalProps> = (props: MyCollectionsModalProps) => {
    const [musicCollections, setMusicCollections] = useState<MusicCollection[]>([]);
    const { modalOpen, modalClose, mixClick } = props;

    const classes = useStyles({});

    useEffect(() => {
        getPrivateMusicCollections(collections => {
            setMusicCollections(collections);
        }, console.log);
    }, []);

    const collectionElements = musicCollections.map((c: MusicCollection, index: number) => {
        return (
            <ListItem divider button key={index} onClick={(): void => mixClick(c.id)}>
                <img className={classes.cover} src={c.cover} alt="cover" />
                {c.name}
            </ListItem>
        );
    });

    return (
        <Dialog
            onClose={(): void => {
                modalClose();
            }}
            aria-labelledby="simple-dialog-title"
            open={modalOpen}
        >
            <div className={classes.paper}>
                <List component="nav">
                    <React.Fragment>{collectionElements}</React.Fragment>{' '}
                </List>
            </div>
        </Dialog>
    );
};
