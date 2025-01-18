import express from "express";

import Album from "../models/Album";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {IAlbum, IAlbumInfo} from "../types";

const albumsRouter = express.Router();

albumsRouter.get('/', async (
    req,
    res,
    next) => {
    const idQuery = req.query.artist as string;
    try {
        if(idQuery) {
            const albumByIdArtist = await Album.find({artist: idQuery}).sort({year: -1});
            if(!albumByIdArtist) res.status(404).send("Not Found");
            res.send(albumByIdArtist);
        } else {
            const albums = await Album.find().sort({year: -1});
            res.send(albums);
        }
    } catch (e) {
        next(e);
    }
});

albumsRouter.get('/:id', async (
    req,
    res,
    next) => {
    const id = req.params.id;
    if(!req.params.id) {
        res.status(404).send("Not Found");
    }
    try {
        const album = await Album.findById(id).populate("artist", '-_id information');
        if (!album) res.status(404).send("Not Found");
        res.send(album);
    } catch (e) {
        next(e);
    }
}
)

albumsRouter.post('/', imagesUpload.single('image'), async (
    req,
    res,
    next) => {

    if (req.body.artist) {
        const artist = await Artist.findById(req.body.artist);
        if (!artist) res.status(404).send('Not Found artist');
    }

    const albumData: IAlbum = {
        artist: req.body.artist,
        title: req.body.title,
        year: req.body.year,
        image: req.file ? 'images' + req.file.filename : null,
    }
    try {
        const album = new Album(albumData);
        await album.save();
        res.send(album);
    } catch (e) {
        next(e);
    }
})

export default albumsRouter;