import express from 'express';
import User from "../models/User";
import TrackHistory from "../models/TrackHistory";
import {Error} from "mongoose";
import {ITrackHistory} from "../types";
import Track from "../models/Track";
import auth, {RequestWithUser} from "../middleware/auth";

const trackHistoriesRouter = express.Router();

trackHistoriesRouter.post('/', async (
    req,
    res,
    next) => {

    const token = req.get('Authorization');

    if(!token){
        res.status(401).send({error: 'No token present'});
        return;
    }
    const user = await User.findOne({token});
    if (!user){
        res.status(401).send({error: 'Wrong token'});
        return;
    }

    if (req.body.track) {
        const track = await Track.findById(req.body.track);
        if (!track) res.status(404).send('Not Found track');
    }

    const trackHistoryData: ITrackHistory = {
        user: user._id.toString(),
        track: req.body.track,
        datetime: req.body.datetime
    };

    try {
        const trackHistory = new TrackHistory(trackHistoryData);
        await trackHistory.save();
        res.send({trackHistory, user: user.username});
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }

})

trackHistoriesRouter.get('/', auth, async (
    req,
    res,
    next) => {
    let reqWithAuth = req as RequestWithUser;
    const userFromAuth = reqWithAuth.user;
    try {
        const trackHistory = await TrackHistory.find({user: userFromAuth._id}).populate("track", "artist title");
        console.log(trackHistory);
        if (trackHistory) {
            res.send(trackHistory);
        }
    }catch (e) {
        next(e);
    }
});

export default trackHistoriesRouter