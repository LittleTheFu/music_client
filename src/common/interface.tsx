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
    canBeDeleted: boolean;
}

export class RetComments {
    comments: MusicComment[];
    pageNum: number;
}

export class RetAvatar {
    remoteUrl: string;
}

export class RetMsgObj {
    msg: string;
    error?: string; // 添加 error 属性
}

export class Mail {
    id: number;
    content: string;
    fromId: number;
    fromName: string;
    fromAvatar: string;
    toName: string;
    read: boolean;
    date: Date;
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
    id: number;
    cover: string;
    name: string;
    canBeDeleted: boolean;
    musics: Music[];
}

export class RetSimpleUser {
    id: number;
    name: string;
    avatarUrl: string;
}

export class RetMeData {
    id: number;
    name: string;
    avatarUrl: string;
    unreadMailNum: number;
}

export class AccessData {
    accessToken: string;
}
