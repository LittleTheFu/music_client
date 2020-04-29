import axios from 'axios';
import { getToken } from './globals';

const hostPrefix = 'http://localhost:9999/';
const userPrefix = hostPrefix + 'users/';
const authPrefix = hostPrefix + 'auth/';
const musicPrefix = hostPrefix + 'music/';
const profilePrefix = hostPrefix + 'profile/';
const commentPrefix = hostPrefix + 'comment/';
const mailPrefix = hostPrefix + 'mail/';

const rawObjectPost = (
    url: string,
    data: object,
    resolve: (data: any) => void,
    headerContent: object = {},
    reject?: (error: any) => void,
): Promise<object> => {
    return axios
        .post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                ...headerContent,
            },
        })
        .then(response => {
            const { data } = response;
            console.log(data);
            resolve(data);
        })
        .catch(err => {
            if (err.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                console.log('err.response');
                console.log(err.response.data);
                console.log(err.response.status);
                console.log(err.response.headers);

                if (reject) {
                    if ('error' in err.response.data) {
                        reject(new Error(err.response.data.error));
                    }
                }
            } else if (err.request) {
                // The request was made but no response was received
                // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
                // http.ClientRequest in node.js
                console.log('err.request');
                console.log(err.request);
            } else {
                // Something happened in setting up the request that triggered an Error
                console.log('Error', err.message);
            }
            console.log(err.config);

            return err;
        });
};

const registerUrl = userPrefix + 'register';
export const postRegister = (
    username: string,
    password: string,
    resolve: (data: any) => void,
    reject: (data: any) => void,
): Promise<object> => {
    return rawObjectPost(registerUrl, { username: username, password: password }, resolve, {}, reject);
};

const loginUrl = authPrefix + 'login';
export const postLogin = (
    username: string,
    password: string,
    resolve: (data: any) => void,
    reject: (data: any) => void,
): Promise<object> => {
    return rawObjectPost(loginUrl, { username: username, password: password }, resolve, {}, reject);
};

const likeMusicUrl = musicPrefix + 'like';
export const postLikeMusic = (
    musicId: number,
    resolve: (data: any) => void,
    reject?: (data: any) => void,
): Promise<object> => {
    return rawObjectPost(
        likeMusicUrl,
        { musicId: musicId },
        resolve,
        { Authorization: 'Bearer ' + getToken() },
        reject,
    );
};

const dislikeMusicUrl = musicPrefix + 'dislike';
export const postDislikeMusic = (musicId: number, resolve: (data: any) => void): Promise<object> => {
    return rawObjectPost(dislikeMusicUrl, { musicId: musicId }, resolve, { Authorization: 'Bearer ' + getToken() });
};

const profileUrl = profilePrefix;
export const postShowProfile = (resolve: (data: any) => void): Promise<object> => {
    return rawObjectPost(profileUrl, {}, resolve, { Authorization: 'Bearer ' + getToken() });
};

const collectionsUrl = musicPrefix + 'collections';
export const getMusicCollections = (resolve: (data: any) => void, reject: (arg0: object) => void): Promise<object> => {
    return rawObjectPost(collectionsUrl, {}, resolve, { Authorization: 'Bearer ' + getToken() });
};

const getPrivateCollectionsUrl = musicPrefix + 'getPrivateMusicCollections';
export const getPrivateMusicCollections = (
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(getPrivateCollectionsUrl, {}, resolve, { Authorization: 'Bearer ' + getToken() });
};

const addMusicToCollectionUrl = musicPrefix + 'addMusicToCollection';
export const addMusicToCollection = (
    collectionId: number,
    musicId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(addMusicToCollectionUrl, { collectionId: collectionId, musicId: musicId }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const getPublicCollectionsUrl = musicPrefix + 'getPublicMusicCollections';
export const getPublicMusicCollections = (
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(getPublicCollectionsUrl, {}, resolve, { Authorization: 'Bearer ' + getToken() });
};

const createCollectionUrl = musicPrefix + 'createCollection';
export const createCollection = (
    name: string,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(createCollectionUrl, { name: name }, resolve, { Authorization: 'Bearer ' + getToken() });
};

const musicsByCollectionIdUrl = musicPrefix + 'GetMusicsByCollectionId';
export const fetchMusicsByCollectionId = (
    id: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(musicsByCollectionIdUrl, { id: id }, resolve, { Authorization: 'Bearer ' + getToken() });
};

const deleteCollectionUrl = musicPrefix + 'deleteCollection';
export const deleteCollection = (
    id: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(deleteCollectionUrl, { id: id }, resolve, { Authorization: 'Bearer ' + getToken() });
};

const getCollectionDetailByIdUrl = musicPrefix + 'GetCollectionDetailById';
export const getCollectionDetailById = (
    id: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(getCollectionDetailByIdUrl, { id: id }, resolve, { Authorization: 'Bearer ' + getToken() });
};

const musicsByKeyWord = musicPrefix + 'GetMusicsByKeyWord';
export const fetchMusicsByKeyword = (
    keyword: string,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(musicsByKeyWord, { keyword: keyword }, resolve, { Authorization: 'Bearer ' + getToken() });
};

const removeMusicFromCollectionUrl = musicPrefix + 'removeMusicFromCollection';
export const removeMusicFromCollection = (
    musicId: number,
    collectionId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(removeMusicFromCollectionUrl, { musicId: musicId, collectionId: collectionId }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const getMusicCommentsUrl = commentPrefix + 'GetMusicComments';
export const getMusicComments = (
    musicId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(getMusicCommentsUrl, { musicId: musicId }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const postMusicCommentsUrl = commentPrefix + 'PostMusicComments';
export const postMusicComments = (
    musicId: number,
    content: string,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(postMusicCommentsUrl, { musicId: musicId, content: content }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const getMeUrl = userPrefix + 'me';
export const getMe = (resolve: (data: any) => void, reject: (arg0: object) => void): Promise<object> => {
    return rawObjectPost(getMeUrl, {}, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const getUserAvatarUrl = profilePrefix + 'getUserAvatar';
export const getUserAvatar = (
    username: string,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(getUserAvatarUrl, { username: username }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const getMailUrl = mailPrefix + 'getMails';
export const getUserMails = (resolve: (data: any) => void, reject: (arg0: object) => void): Promise<object> => {
    return rawObjectPost(getMailUrl, {}, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const getMailDetailUrl = mailPrefix + 'getMail';
export const getMailDetail = (
    mailId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(getMailDetailUrl, { mailId: mailId }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const deleteMailUrl = mailPrefix + 'deleteMail';
export const deleteMail = (
    mailId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(deleteMailUrl, { mailId: mailId }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const sendMailUrl = mailPrefix + 'sendMail';
export const sendMail = (
    toId: number,
    content: string,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(sendMailUrl, { toId: toId, content: content }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const detailUrl = userPrefix + 'detail';
export const getDetail = (
    userId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(detailUrl, { userId: userId }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const followUserUrl = userPrefix + 'follow';
export const followUser = (
    userId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(followUserUrl, { userId: userId }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const unfollowUserUrl = userPrefix + 'unfollow';
export const unfollowUser = (
    userId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(unfollowUserUrl, { userId: userId }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const getUserFollowersUrl = userPrefix + 'getUserFollowers';
export const getUserFollowers = (
    userId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(getUserFollowersUrl, { userId: userId }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const getAlbumsUrl = musicPrefix + 'getAlbums';
export const getAlbums = (resolve: (data: any) => void, reject: (arg0: object) => void): Promise<object> => {
    return rawObjectPost(getAlbumsUrl, {}, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const getAlbumDetailUrl = musicPrefix + 'getAlbumDetail';
export const getAlbumDetail = (
    albumId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(getAlbumDetailUrl, { albumId: albumId }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const getArtistInfoUrl = musicPrefix + 'getArtistInfo';
export const getArtistInfo = (
    artistId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(getArtistInfoUrl, { artistId: artistId }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

//------------------------------------------------------------

const fileObjectPost = (
    url: string,
    data: FormData,
    resolve: (data: any) => void,
    headerContent: object = {},
): Promise<object> => {
    return axios
        .post(url, data, {
            headers: {
                ...headerContent,
            },
        })
        .then(response => {
            const { data } = response;
            return data;
        })
        .catch(err => {
            return err;
        });
};

const uploadAvatarUrl = profilePrefix + 'upload';
export const uploadAvatar = (
    data: FormData,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return fileObjectPost(uploadAvatarUrl, data, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const getMusicLyricUrl = musicPrefix + 'getLyric';
export const getLyric = (
    musicId: number,
    resolve: (data: any) => void,
    reject: (arg0: object) => void,
): Promise<object> => {
    return rawObjectPost(getMusicLyricUrl, { musicId: musicId }, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};
