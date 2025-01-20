import express from 'express';
import {Error} from "mongoose";
import User from "../models/User";
import auth, {RequestWithUser} from "../middleware/auth";

const userRouter = express.Router();

userRouter.post('/register', async (
    req,
    res,
    next) => {
    try {
        const currentUser = await User.findOne({username: req.body.username})
        const user = new User({
            username: req.body.username,
            password: req.body.password,
        });
        if(currentUser) {
            if(currentUser.username === user.username) {
                res.status(401).json({error: "User already exists"});
                return;
            }
        }
        user.generateToken();
        await user.save();
        res.send({user, message: "Register success"});
    } catch (error) {

        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})

userRouter.post('/sessions', async (
    req,
    res,
    next) => {
    try {
        const user = await User.findOne({username: req.body.username});
        if (!user) {
            res.status(400).send({error: 'Username not found'});
            return;
        }
        const isMatch = await user.checkPassword(req.body.password);
        if (!isMatch) {
            res.status(400).send({error: 'Password is wrong!'});
            return;
        }

        user.generateToken();
        await user.save();

        res.send({message: "Username and password is correct", user:{username: user.username, token: user.token}});
    } catch (error) {

        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})

userRouter.delete('/sessions', auth, async (
    req,
    res,
    next) => {
    let reqWithAuth = req as RequestWithUser;
    const userFromAuth = reqWithAuth.user;
    try {
        const user = await User.findOne({_id: userFromAuth._id});
        if (user) {
            user.generateToken();
            await user.save();
            res.send({message: "Success logout"});
        }
    } catch (error) {
        if (error instanceof Error.ValidationError) {
            res.status(400).send(error);
            return;
        }
        next(error);
    }
})

export default userRouter;
