export interface IArtist {
    name: string;
    photo: string | null;
    information: string;
}

export interface IArtistInfo {
    _id: string;
    name: string;
    photo: string | null;
    information: string;
}

export interface IAlbum {
    artist: string,
    title: string,
    year: number,
    image: string | null
}

export interface IAlbumInfo {
    _id: string;
    artist: string
    title: string,
    year: number,
    image: string | null
}

export interface ITrack {
    album: string
    title: string,
    duration: string,
    trackNumber: number
}

export interface ITrackInfo {
    _id: string;
    album: string
    title: string,
    duration: string,
    trackNumber: number
}

export interface UserFields {
    username: string;
    password: string;
    token: string;
}


