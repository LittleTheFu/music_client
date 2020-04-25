import React, { useState, useEffect } from 'react';
import Dialog from '@material-ui/core/Dialog';
import { MusicCollection } from '../dataInterfaces/music';
import { getPrivateMusicCollections } from '../service';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import { addMusicToCollection } from '../service';
import { makeStyles, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() =>
    createStyles({
        cover: {
            padding: 5,
            height: 30,
        },
        paper: {
            width: 400,
        },
    }),
);

interface MyCollectionsModalProps {
    modalOpen: boolean;
    modalClose: () => void;
    musicId: number;
}

export const MyCollectionsModal: React.FC<MyCollectionsModalProps> = (props: MyCollectionsModalProps) => {
    const [musicCollections, setMusicCollections] = useState<MusicCollection[]>([]);
    const { modalOpen, modalClose, musicId } = props;

    const classes = useStyles({});

    useEffect(() => {
        getPrivateMusicCollections(collections => {
            setMusicCollections(collections);
        }, console.log);
    }, []);

    const clickCollection = (collectionId: number): void => {
        addMusicToCollection(
            collectionId,
            musicId,
            (o): void => {
                modalClose();
            },
            console.log,
        );
    };

    const collectionElements = musicCollections.map((c: MusicCollection, index: number) => {
        return (
            <ListItem divider button key={index} onClick={(): void => clickCollection(c.id)}>
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
