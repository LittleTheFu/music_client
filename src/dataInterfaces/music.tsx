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

// export const dummyCollection: MusicCollection = {
//     id: 0,
//     name: 'dummy',
//     cover: 'cover',
//     isPlaying: false,
// };

export class MusicComment {
    id: number;
    content: string;
    username: string;
    avatar: string;
    userId: number;
    date: Date;
}

export class RetUpdateAvatarDto {
    remoteUrl: string;
}

export class Mail {
    id: number;

    content: string;

    fromName: string;

    toName: string;

    fromId: number;
}

export class UserDetail {
    name: string;
    avatarUrl: string;
    isFollowed: boolean;
    collections: MusicCollection[];
}

export class Follower {
    id: number;
    name: string;
    avatarUrl: string;
    isFollowed: boolean;
}

export class CollectionDetail {
    cover: string;
    name: string;
    canBeDeleted: boolean;
    musics: Music[];
}

// export const dummyCollectionDetail: CollectionDetail = {
//     cover: 'http://localhost:9999/album/3.png',
//     name: 'detail_name',
//     canBeDeleted: false,
//     musics: [],
// };

export const dummyMail: Mail = {
    id: 0,
    fromName: 'dummyFrom',
    toName: 'dummyTo',
    content: 'dummyContent',
    fromId: 0,
};
