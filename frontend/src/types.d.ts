export interface IArtistRes {
    _id: string;
    name: string;
    photo: string | null;
    information: string;
}

export interface IAlbumRes {
    _id: string;
    artist: IArtistRes;
    title: string;
    year: number;
    image: string | null;
}

export interface ITrackRes {
    _id: string;
    album: IAlbumRes;
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
}

export interface IRegisterResponse {
    user: User;
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