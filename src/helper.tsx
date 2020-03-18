import { MusicCollection } from './dataInterfaces/music';

export const setCollectionPlayFlag = (
    collections: MusicCollection[],
    currentCollectionName: string,
): MusicCollection[] => {
    // const currentCollection = collections.find(c => c.name === currentCollectionName);
    console.log('currentCollectionName : ' + currentCollectionName);
    return collections.map(c => {
        if (c.name === currentCollectionName) {
            c.isPlaying = true;
        } else {
            c.isPlaying = false;
        }

        return c;
    });
};
