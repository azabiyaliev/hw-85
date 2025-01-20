import express from "express";
import cors from "cors";
import mongoDb from "./mongoDb";
import * as mongoose from "mongoose";
import config from "./config";
import artistsRouter from "./routers/artists";
import albumsRouter from "./routers/albums";
import tracksRouter from "./routers/tracks";
import userRouter from "./routers/users";
import trackHistoriesRouter from "./routers/trackHistories";

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use("/artists", artistsRouter);
app.use("/albums", albumsRouter);
app.use("/tracks", tracksRouter);
app.use("/trackHistories", trackHistoriesRouter);
app.use("/users", userRouter);


const run = async () => {

    await mongoose.connect(config.db);

    app.listen(port, () => {
        console.log(`Server started on port http://localhost:${port}`);
    });

    process.on("exit", (err) => {
        mongoDb.disconnect();
    })
}

run().catch(err => console.log(err));