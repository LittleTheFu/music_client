const info = {
    method: 'GET',
};

const musicUrl = 'http://localhost:9999/music/nextmusic';

async function api<T>(url: string, info: object): Promise<T> {
    const response = await fetch(url, info);
    if (!response.ok) {
        console.log(response);
        throw new Error(response.statusText);
    }
    const data = await response.json();
    return data as T;
}

export const fetchNextMusic = (
    resolve: (arg0: string, arg1: string, arg2: string, arg3: string, arg4: string) => void,
    reject: (arg0: object) => void,
): void => {
    api<{ address: string; cover: string; name: string; artist: string; album: string }>(musicUrl, info)
        .then(({ address, cover, name, artist, album }) => resolve(address, cover, name, artist, album))
        .catch(e => reject(e));
};
