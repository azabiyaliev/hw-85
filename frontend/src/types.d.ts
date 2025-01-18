export interface IArtistRes {
    _id: string;
    name: string;
    photo: string | null;
    information: string;
}

export interface IAlbumRes {
    _id: string;
    artist: string;
    title: string;
    year: number;
    image: string | null;
}