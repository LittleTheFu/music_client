// export interface Music {
//     id: number;
//     address: string;
//     cover: string;
//     name: string;
//     artist: string;
//     album: string;
// }

export class Music {
    id: number;

    address: string;

    cover: string;

    name: string;

    artist: string;

    album: string;

    like: number;

    likedByCurrentUser: boolean;
}

export const dummyMusic: Music = {
    id: 0,
    address: 'address',
    cover: 'default.png',
    name: 'name',
    artist: 'artist',
    album: 'album',
    like: 0,
    likedByCurrentUser: false,
};

export class MusicCollection {
    id: number;

    name: string;
}
