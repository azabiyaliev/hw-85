import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AlbumSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    artist: {
        type: Schema.Types.ObjectId,
        ref: "Artist",
        required: [true, "Artist is required"],
    },
    title: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: true,
    },
    image: {
        type: String,
        default: null,
    },
    isPublished: {
        type: Boolean,
        default: false,
    }
});

const Album = mongoose.model('Album', AlbumSchema);
export default Album;