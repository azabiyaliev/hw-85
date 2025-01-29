import mongoose from "mongoose";

const Schema = mongoose.Schema;


const ArtistSchema = new mongoose.Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: [true, "User is required"]
    },
    name: {
        type: String,
        required: true,
        unique: true,
    },
    photo: {
        type: String,
        default: null,
    },
    information: {
        type: String,
        default: null,
    },
    isPublished: {
        type: Boolean,
        default: false,
    }
});

const Artist = mongoose.model('Artist', ArtistSchema);
export default Artist;