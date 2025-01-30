export interface IArtistRes {
    _id: string;
    user: {user: string};
    name: string;
    photo: string | null;
    information: string;
}

export interface IArtist {
    user: string;
    name: string;
    photo: File | null;
    information: string;
}

export interface IAlbumRes {
    _id: string;
    user: string;
    artist: {name: string};
    title: string;
    year: number;
    image: string | null;
}

export interface IAlbum {
    user: string;
    artist: string;
    title: string;
    year: string;
    image: File | null;
}

export interface ITrackRes {
    _id: string;
    user: string;
    album: string;
    title: string;
    trackNumber: number;
    duration: number;
}

export interface ITrack {
    user: string;
    album: {_id: string, artist: string};
    title: string;
    trackNumber: number;
    duration: number;
}

export interface IRegister {
    username: string;
    password: string;
}

export interface ILogin {
    username: string;
    password: string;
}

export interface IUser {
    _id: string;
    username: string;
    token: string;
    role: string;
}

export interface IRegisterResponse {
    user: IUser;
    message: string;
}

export interface ValidationError {
    errors: {
        [key: string]:{
            name: string;
            message: string;
        }
    },
    message: string;
    name: string;
    _message: string;
}

export interface GlobalError {
    error: string;
}

export interface ITrackHistory {
    track: string;
    datetime: Date;
}

export interface ITrackHistoryRes {
    _id: string;
    user: string;
    track: ITrackRes;
    datetime: string;
}