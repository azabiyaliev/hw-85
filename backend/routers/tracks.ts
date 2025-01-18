import express from "express";
import Track from "../models/Track";
import Album from "../models/Album";
import {ITrack, ITrackInfo} from "../types";

const tracksRouter = express.Router();

tracksRouter.get('/', async (
    req,
    res,
    next) => {
    const idQuery = req.query.album as string;
    try {
        if(idQuery) {
            const trackByIdAlbum: ITrackInfo[] = await Track.find({album: idQuery});
            if(!trackByIdAlbum) res.status(404).send("Not Found");
            res.send(trackByIdAlbum);
        } else {
            const tracks: ITrackInfo[] = await Track.find();
            res.send(tracks);
        }
    } catch (e) {
        next(e);
    }
});

tracksRouter.post('/', async (
    req,
    res,
    next) => {
    if (req.body.album) {
        const album = await Album.findById(req.body.album);
        if (!album) res.status(404).send('Not Found album');
    }
    const trackData: ITrack = {
        album: req.body.album,
        title: req.body.title,
        duration: req.body.duration,
        trackNumber: req.body.trackNumber
    }
    try {
        const track = new Track(trackData);
        await track.save();
        res.send(track);
    } catch (e) {
        next(e);
    }
})

export default tracksRouter;