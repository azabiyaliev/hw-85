import express from "express";

import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import {IArtist, IArtistInfo} from "../types";

const artistsRouter = express.Router();

artistsRouter.get('/', async (
    _req,
    res,
    next) => {
    try {
        const artists: IArtistInfo[] = await Artist.find();
        res.send(artists);
    } catch (e) {
        next(e);
    }
});


artistsRouter.post('/', imagesUpload.single('photo'), async (
    req,
    res,
    next) => {
    const artistData: IArtist = {
        name: req.body.name,
        photo: req.file ? 'photo' + req.file.filename : null,
        information: req.body.information,
    }
    try {
        const artist = new Artist(artistData);
        await artist.save();
        res.send(artist);
    } catch (e) {
        next(e);
    }
})

export default artistsRouter;