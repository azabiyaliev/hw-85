import express from "express";

import Album from "../models/Album";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";
import {Error} from "mongoose";

const albumsRouter = express.Router();

albumsRouter.get('/', async (
    req,
    res,
    next) => {
    const idQuery = req.query.artist as string;
    try {
        if(idQuery) {
            const albumByIdArtist = await Album.find({artist: idQuery}).populate("artist","name").sort({year: -1});
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
        const album = await Album.findById(id).populate("artist", '-_id information').sort({year: -1});
        if (!album) res.status(404).send("Not Found");
        res.send(album);
    } catch (e) {
        next(e);
    }
}
)

albumsRouter.post('/', imagesUpload.single('image'), auth, permit("admin", "user"), async (
    req,
    res,
    next) => {
    let reqWithUser = req as RequestWithUser;
    const userFromAuth = reqWithUser.user._id;
    if (req.body.artist) {
        const artist = await Artist.findById(req.body.artist);
        if (!artist) res.status(404).send('Not Found artist');
    }

    const albumData = {
        user: userFromAuth,
        artist: req.body.artist,
        title: req.body.title,
        year: req.body.year,
        image: req.file ? 'images' + req.file.filename : null,
        isPublished: false,
    }
    try {
        const album = new Album(albumData);
        await album.save();
        res.send(album);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})

albumsRouter.delete('/:id', auth, permit("admin", "user"), async (
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
            const albumDeleteByAdmin = await Album.findByIdAndDelete(id)
            res.send(albumDeleteByAdmin);
        } else {
            const albumDelete = await Album.findOneAndDelete({
                _id: id,
                user: userFromAuth,
                isPublished: false,
            });
            if (!albumDelete) {
                res.status(403).send({message: "Album not found or access denied"});
                return;
            }
            res.send({message: "Successfully deleted", album: albumDelete});
        }

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})

albumsRouter.patch('/:id/togglePublished', auth, permit("admin"), async (
    req,
    res,
    next) => {
    const id = req.params.id;

    try {
        const album = await Album.findOne(
            {_id: id });
        if (!album) {
            res.status(403).send({error: "Album not found or access denied"});
            return
        }

        if(req.body.user) delete req.body.user;

        const updateAlbum = await Album.findOneAndUpdate(
            {_id: id},
            [{$set: {isPublished: {$not: "$isPublished"}}}],
            {new: true, runValidators: true}
        )
        if (updateAlbum) {
            res.send({message: "Successfully updated", isPublished: updateAlbum.isPublished});
        }

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})


export default albumsRouter;