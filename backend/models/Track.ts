import mongoose from "mongoose";

const Schema = mongoose.Schema;

const TrackSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
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
        required: true,
    },
    trackNumber: {
        type: Number,
        required: true,
    },
    isPublished: {
        type: Boolean,
        default: false,
    }
});

const Track = mongoose.model('Track', TrackSchema);
export default Track;