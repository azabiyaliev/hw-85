import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TrackSchema = new mongoose.Schema({
    album: {
        type: Schema.Types.ObjectId,
        ref: "Album",
        required: [true, "Album is required"],
    },
    title: {
        type: String,
        required: true,
    },
    duration: {
        type: String,
    },
    trackNumber: {
        type: Number,
        required: true,
    }
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;