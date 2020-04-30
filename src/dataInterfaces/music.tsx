export class Music {
    id: number;
    address: string;
    cover: string;
    name: string;
    artist: string;
    artistId: number;
    album: string;
    albumId: number;
    like: number;
    likedByCurrentUser: boolean;
    isInPlayList: boolean;
}

export class Artist {
    id: number;
    name: string;
    avatar: string;
    albums: MusicCollection[];
}

export const dummyMusic: Music = {
    id: 0,
    address: 'address',
    cover: 'default.png',
    name: 'name',
    artist: 'artist',
    artistId: 0,
    album: 'album',
    albumId: 0,
    like: 0,
    likedByCurrentUser: false,
    isInPlayList: false,
};

export class MusicCollection {
    id: number;
    cover: string;
    name: string;
    musics: Music[];
}

export class Album {
    id: number;
    cover: string;
    name: string;
}

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

export class SimpleUser {
    id: number;
    name: string;
    avatarUrl: string;
}
