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

    isInPlayList: boolean;
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
    isInPlayList: false,
};

export class MusicCollection {
    id: number;

    name: string;

    cover: string;

    isPlaying: boolean;
}

export const dummyCollection: MusicCollection = {
    id: 0,
    name: 'dummy',
    cover: 'cover',
    isPlaying: false,
};

export class MusicComment {
    id: number;
    content: string;
    username: string;
    avatar: string;
}

export class RetUpdateAvatarDto {
    remoteUrl: string;
}

export class Mail {
    id: number;

    content: string;

    fromName: string;

    toName: string;
}
