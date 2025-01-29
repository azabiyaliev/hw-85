import express from "express";
import {Error} from "mongoose";
import Artist from "../models/Artist";
import {imagesUpload} from "../multer";
import auth, {RequestWithUser} from "../middleware/auth";
import permit from "../middleware/permit";

const artistsRouter = express.Router();

artistsRouter.get('/', async (
    _req,
    res,
    next) => {
    try {
        const artists = await Artist.find();
        res.send(artists);
    } catch (e) {
        next(e);
    }
});

artistsRouter.post('/', imagesUpload.single('photo'), auth, permit("admin", "user"), async (
    req,
    res,
    next) => {
    let reqWithUser = req as RequestWithUser;
    const userFromAuth = reqWithUser.user._id;

    const artistData = {
        user: userFromAuth,
        name: req.body.name,
        photo: req.file ? 'photo' + req.file.filename : null,
        information: req.body.information,
        isPublished: false,
    }
    try {
        const artist = new Artist(artistData);
        await artist.save();
        res.send(artist);
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})

artistsRouter.delete('/:id', auth, permit("admin", "user"), async (
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
            const artistDeleteByAdmin = await Artist.findByIdAndDelete(id)
            res.send(artistDeleteByAdmin);
        } else {
            const artistDelete = await Artist.findOneAndDelete({
                _id: id,
                user: userFromAuth,
                isPublished: false,
            });
            if (!artistDelete) {
                res.status(403).send({message: "Artist not found or access denied"});
                return;
            }
            res.send({message: "Successfully deleted", artist: artistDelete});
        }

    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})


export default artistsRouter;