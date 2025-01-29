import express from "express";
import Track from "../models/Track";
import Album from "../models/Album";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import {Error} from "mongoose";

const tracksRouter = express.Router();

tracksRouter.get('/', async (
    req,
    res,
    next) => {
    const idQuery = req.query.album as string;
    try {
        if(idQuery) {
            const trackByIdAlbum = await Track.find({album: idQuery}).populate("album", "artist title").sort({trackNumber: 1});
            if(!trackByIdAlbum) res.status(404).send("Not Found");
            res.send(trackByIdAlbum);
        } else {
            const tracks = await Track.find();
            res.send(tracks);
        }
    } catch (e) {
        next(e);
    }
});

tracksRouter.post('/', auth, permit("admin", "user"), async (
    req,
    res,
    next) => {

    let reqWithUser = req as RequestWithUser;
    const userFromAuth = reqWithUser.user._id;

    if (req.body.album) {
        const album = await Album.findById(req.body.album);
        if (!album) res.status(404).send('Not Found album');
    }
    const trackData = {
        user: userFromAuth,
        album: req.body.album,
        title: req.body.title,
        duration: req.body.duration,
        trackNumber: req.body.trackNumber,
        isPublished: false
    }
    try {
        const track = new Track(trackData);
        await track.save();
        res.send(track);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})

tracksRouter.delete('/:id', auth, permit("admin", "user"), async (
    req,
    res,
    next) => {
    const id = req.params.id;
    let reqWithUser = req as RequestWithUser;
    const userFromAuth = reqWithUser.user._id;
    if(!id) {
        res.status(400).send({error: "Missing ID"});
        return;
    }
    try {
        if(reqWithUser.user.role === "admin") {
            const trackDeleteByAdmin = await Track.findByIdAndDelete(id)
            res.send(trackDeleteByAdmin);
        } else {
            const trackDelete = await Track.findOneAndDelete({
                _id: id,
                user: userFromAuth,
                isPublished: false,
            });
            if (!trackDelete) {
                res.status(403).send({message: "Track not found or access denied"});
                return;
            }
            res.send({message: "Successfully deleted", track: trackDelete});
        }

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})

tracksRouter.patch('/:id/togglePublished', auth, permit("admin"), async (
    req,
    res,
    next) => {
    const id = req.params.id;

    try {
        const track = await Track.findOne(
            {_id: id});
        if (!track) {
            res.status(403).send({error: "Track not found or access denied"});
        }

        if(req.body.user) delete req.body.user;

        const updateTrack = await Track.findOneAndUpdate(
            {_id: id},
            [{$set: {isPublished: {$not: "$isPublished"}}}],
            {new: true, runValidators: true}
        )
        if (updateTrack) {
            res.send({message: "Successfully updated", isPublished: updateTrack.isPublished});
        }

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})


export default tracksRouter;