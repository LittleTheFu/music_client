import axios from 'axios';
import { getToken } from '../globals';
import {
    AccessData,
    RetSimpleUser,
    RetMeData,
    Music,
    CollectionDetail,
    Mail,
    Follower,
    Artist,
    MusicCollection,
    UserDetail,
    RetAvatar,
    RetMsgObj,
    RetComments,
} from './interface';
import { getDispatch } from 'reactn';

// const hostPrefix = 'http://localhost:9999/';
// const hostPrefix = 'http://192.168.0.101:9999/';
const hostPrefix = process.env.REACT_APP_HOST;
const userPrefix = hostPrefix + 'users/';
const authPrefix = hostPrefix + 'auth/';
const musicPrefix = hostPrefix + 'music/';
const profilePrefix = hostPrefix + 'profile/';
const commentPrefix = hostPrefix + 'comment/';
const mailPrefix = hostPrefix + 'mail/';

function rawObjectPost<T>(
    url: string,
    data: object,
    resolve: (data: T) => void,
    headerContent: object = {},
    reject: (error: Error) => void,
): Promise<T> {
    return axios
        .post(url, JSON.stringify(data), {
            headers: {
                'Content-Type': 'application/json',
                ...headerContent,
            },
        })
        .then(response => {
            const { data } = response;
            // console.log(data);
            resolve(data);
        })
        .catch(err => {
            if (err.response) {
                // console.log('err.response');
                // console.log(err.response.data);
                // console.log(err.response.status);
                // console.log(err.response.headers);

                if ('error' in err.response.data) {
                    if (reject) {
                        reject(new Error(err.response.data.error));
                    } else {
                        getDispatch().openHint(err.response.data.error);
                    }
                }
            } else if (err.request) {
                // console.log('err.request');
                // console.log(err.request);
            } else {
                // console.log('Error', err.message);
            }
            // console.log(err.config);

            return err;
        });
}

const registerUrl = userPrefix + 'register';
export const postRegister = (
    username: string,
    password: string,
    email: string,
    resolve: (data: RetMsgObj) => void,
    reject?: (data: Error) => void,
): Promise<RetMsgObj> => {
    return rawObjectPost(registerUrl, { username: username, password: password, email: email }, resolve, {}, reject);
};

const loginUrl = authPrefix + 'login';
export const postLogin = (
    username: string,
    password: string,
    resolve: (data: AccessData) => void,
    reject?: (data: Error) => void,
): Promise<AccessData> => {
    return rawObjectPost(loginUrl, { username: username, password: password }, resolve, {}, reject);
};

const editPasswordUrl = userPrefix + 'edit_password';
export const editPassword = (
    password: string,
    resolve: (data: RetMsgObj) => void,
    reject?: (data: Error) => void,
): Promise<RetMsgObj> => {
    return rawObjectPost(
        editPasswordUrl,
        { password: password },
        resolve,
        { Authorization: 'Bearer ' + getToken() },
        reject,
    );
};

const likeMusicUrl = musicPrefix + 'like';
export const postLikeMusic = (
    musicId: number,
    resolve: (data: Music) => void,
    reject?: (data: Error) => void,
): Promise<Music> => {
    return rawObjectPost(
        likeMusicUrl,
        { musicId: musicId },
        resolve,
        { Authorization: 'Bearer ' + getToken() },
        reject,
    );
};

const getAllUsersUrl = userPrefix + 'getAllUsers';
export const getAllUsers = (
    resolve: (data: RetSimpleUser[]) => void,
    reject?: (data: Error) => void,
): Promise<RetSimpleUser[]> => {
    return rawObjectPost(getAllUsersUrl, {}, resolve, { Authorization: 'Bearer ' + getToken() }, reject);
};

const dislikeMusicUrl = musicPrefix + 'dislike';
export const postDislikeMusic = (
    musicId: number,
    resolve: (data: Music) => void,
    reject?: (data: Error) => void,
): Promise<Music> => {
    return rawObjectPost(
        dislikeMusicUrl,
        { musicId: musicId },
        resolve,
        { Authorization: 'Bearer ' + getToken() },
        reject,
    );
};

const getPrivateCollectionsUrl = musicPrefix + 'getPrivateMusicCollections';
export const getPrivateMusicCollections = (
    resolve: (data: MusicCollection[]) => void,
    reject?: (arg0: object) => void,
): Promise<MusicCollection[]> => {
    return rawObjectPost(getPrivateCollectionsUrl, {}, resolve, { Authorization: 'Bearer ' + getToken() }, reject);
};

const addMusicToCollectionUrl = musicPrefix + 'addMusicToCollection';
export const addMusicToCollection = (
    collectionId: number,
    musicId: number,
    resolve: (data: RetMsgObj) => void,
    reject?: (arg0: object) => void,
): Promise<RetMsgObj> => {
    return rawObjectPost(
        addMusicToCollectionUrl,
        { collectionId: collectionId, musicId: musicId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const createCollectionUrl = musicPrefix + 'createCollection';
export const createCollection = (
    name: string,
    resolve: (data: CollectionDetail) => void,
    reject?: (arg0: object) => void,
): Promise<CollectionDetail> => {
    return rawObjectPost(
        createCollectionUrl,
        { name: name },
        resolve,
        { Authorization: 'Bearer ' + getToken() },
        reject,
    );
};

const musicsByCollectionIdUrl = musicPrefix + 'GetMusicsByCollectionId';
export const fetchMusicsByCollectionId = (
    id: number,
    resolve: (data: Music[]) => void,
    reject?: (arg0: object) => void,
): Promise<Music[]> => {
    return rawObjectPost(
        musicsByCollectionIdUrl,
        { id: id },
        resolve,
        { Authorization: 'Bearer ' + getToken() },
        reject,
    );
};

const deleteCollectionUrl = musicPrefix + 'deleteCollection';
export const deleteCollection = (
    id: number,
    resolve: (data: RetMsgObj) => void,
    reject?: (arg0: object) => void,
): Promise<RetMsgObj> => {
    return rawObjectPost(deleteCollectionUrl, { id: id }, resolve, { Authorization: 'Bearer ' + getToken() }, reject);
};

const getCollectionDetailByIdUrl = musicPrefix + 'GetCollectionDetailById';
export const getCollectionDetailById = (
    id: number,
    resolve: (data: CollectionDetail) => void,
    reject?: (arg0: object) => void,
): Promise<CollectionDetail> => {
    return rawObjectPost(
        getCollectionDetailByIdUrl,
        { id: id },
        resolve,
        { Authorization: 'Bearer ' + getToken() },
        reject,
    );
};

const musicsByKeyWord = musicPrefix + 'GetMusicsByKeyWord';
export const fetchMusicsByKeyword = (
    keyword: string,
    resolve: (data: Music[]) => void,
    reject?: (arg0: object) => void,
): Promise<Music[]> => {
    return rawObjectPost(
        musicsByKeyWord,
        { keyword: keyword },
        resolve,
        { Authorization: 'Bearer ' + getToken() },
        reject,
    );
};

const removeMusicFromCollectionUrl = musicPrefix + 'removeMusicFromCollection';
export const removeMusicFromCollection = (
    musicId: number,
    collectionId: number,
    resolve: (data: RetMsgObj) => void,
    reject?: (arg0: object) => void,
): Promise<RetMsgObj> => {
    return rawObjectPost(
        removeMusicFromCollectionUrl,
        { musicId: musicId, collectionId: collectionId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const getMusicCommentsUrl = commentPrefix + 'GetMusicComments';
export const getMusicComments = (
    musicId: number,
    page: number,
    resolve: (data: RetComments) => void,
    reject?: (arg0: object) => void,
): Promise<RetComments> => {
    return rawObjectPost(
        getMusicCommentsUrl,
        { musicId: musicId, page: page },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const deleteMusicCommentUrl = commentPrefix + 'DeleteMusicComment';
export const deleteMusicComment = (
    commentId: number,
    resolve: (data: RetMsgObj) => void,
    reject: (arg0: object) => void,
): Promise<RetMsgObj> => {
    return rawObjectPost(
        deleteMusicCommentUrl,
        { commentId: commentId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const postMusicCommentsUrl = commentPrefix + 'PostMusicComments';
export const postMusicComments = (
    musicId: number,
    content: string,
    resolve: (data: RetMsgObj) => void,
    reject: (arg0: object) => void,
): Promise<RetMsgObj> => {
    return rawObjectPost(
        postMusicCommentsUrl,
        { musicId: musicId, content: content },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const getMeUrl = userPrefix + 'me';
export const getMe = (resolve: (data: RetMeData) => void, reject?: (arg0: object) => void): Promise<RetMeData> => {
    return rawObjectPost(
        getMeUrl,
        {},
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const getUnreadMailNumUrl = mailPrefix + 'getUnreadMailNum';
export const getUnreadMailNum = (resolve: (num: number) => void, reject?: (arg0: object) => void): Promise<number> => {
    return rawObjectPost(
        getUnreadMailNumUrl,
        {},
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const getMailUrl = mailPrefix + 'getMails';
export const getUserMails = (resolve: (data: Mail[]) => void, reject?: (arg0: object) => void): Promise<Mail[]> => {
    return rawObjectPost(
        getMailUrl,
        {},
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const getMailDetailUrl = mailPrefix + 'getMail';
export const getMailDetail = (
    mailId: number,
    resolve: (data: Mail) => void,
    reject?: (arg0: object) => void,
): Promise<Mail> => {
    return rawObjectPost(
        getMailDetailUrl,
        { mailId: mailId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const deleteMailUrl = mailPrefix + 'deleteMail';
export const deleteMail = (
    mailId: number,
    resolve: (data: RetMsgObj) => void,
    reject?: (arg0: object) => void,
): Promise<RetMsgObj> => {
    return rawObjectPost(
        deleteMailUrl,
        { mailId: mailId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const sendMailUrl = mailPrefix + 'sendMail';
export const sendMail = (
    toId: number,
    content: string,
    resolve: (data: RetMsgObj) => void,
    reject?: (arg0: object) => void,
): Promise<RetMsgObj> => {
    return rawObjectPost(
        sendMailUrl,
        { toId: toId, content: content },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const detailUrl = userPrefix + 'detail';
export const getDetail = (
    userId: number,
    resolve: (data: UserDetail) => void,
    reject?: (arg0: object) => void,
): Promise<UserDetail> => {
    return rawObjectPost(
        detailUrl,
        { userId: userId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const followUserUrl = userPrefix + 'follow';
export const followUser = (
    userId: number,
    resolve: (data: RetMsgObj) => void,
    reject?: (arg0: object) => void,
): Promise<RetMsgObj> => {
    return rawObjectPost(
        followUserUrl,
        { userId: userId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const unfollowUserUrl = userPrefix + 'unfollow';
export const unfollowUser = (
    userId: number,
    resolve: (data: RetMsgObj) => void,
    reject?: (arg0: object) => void,
): Promise<RetMsgObj> => {
    return rawObjectPost(
        unfollowUserUrl,
        { userId: userId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const getUserFollowersUrl = userPrefix + 'getUserFollowers';
export const getUserFollowers = (
    userId: number,
    resolve: (data: Follower[]) => void,
    reject?: (arg0: object) => void,
): Promise<Follower[]> => {
    return rawObjectPost(
        getUserFollowersUrl,
        { userId: userId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const getAlbumsUrl = musicPrefix + 'getAlbums';
export const getAlbums = (
    resolve: (data: MusicCollection[]) => void,
    reject?: (arg0: object) => void,
): Promise<MusicCollection[]> => {
    return rawObjectPost(
        getAlbumsUrl,
        {},
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const getAlbumDetailUrl = musicPrefix + 'getAlbumDetail';
export const getAlbumDetail = (
    albumId: number,
    resolve: (data: CollectionDetail) => void,
    reject?: (arg0: object) => void,
): Promise<CollectionDetail> => {
    return rawObjectPost(
        getAlbumDetailUrl,
        { albumId: albumId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

const getArtistInfoUrl = musicPrefix + 'getArtistInfo';
export const getArtistInfo = (
    artistId: number,
    resolve: (data: Artist) => void,
    reject?: (arg0: object) => void,
): Promise<Artist> => {
    return rawObjectPost(
        getArtistInfoUrl,
        { artistId: artistId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};

//------------------------------------------------------------

function fileObjectPost<T>(
    url: string,
    data: FormData,
    resolve: (data: T) => void,
    headerContent: object = {},
): Promise<T> {
    return axios
        .post(url, data, {
            headers: {
                ...headerContent,
            },
        })
        .then(response => {
            const { data } = response;
            resolve(data);
            return data;
        })
        .catch(err => {
            return err;
        });
}

const uploadAvatarUrl = profilePrefix + 'upload';
export const uploadAvatar = (data: FormData, resolve: (data: RetAvatar) => void): Promise<RetAvatar> => {
    return fileObjectPost(uploadAvatarUrl, data, resolve, {
        Authorization: 'Bearer ' + getToken(),
    });
};

const getMusicLyricUrl = musicPrefix + 'getLyric';
export const getLyric = (
    musicId: number,
    resolve: (data: string) => void,
    reject: (arg0: object) => void,
): Promise<string> => {
    return rawObjectPost(
        getMusicLyricUrl,
        { musicId: musicId },
        resolve,
        {
            Authorization: 'Bearer ' + getToken(),
        },
        reject,
    );
};
