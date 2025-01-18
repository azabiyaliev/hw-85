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