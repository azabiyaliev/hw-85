import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import {ITrack} from "../../../types";
import {toast} from "react-toastify";
import TrackForm from "../components/TrackForm.tsx";
import {postTrack} from "../tracksThunk.ts";
import {selectLoadingTrackPost} from "../tracksSlice.ts";

const NewTrack = () => {
    const dispatch = useAppDispatch();
    const isPostLoading = useAppSelector(selectLoadingTrackPost);
    const navigate = useNavigate();

    const onSubmitForm = async (track: ITrack) => {
        try {
            await dispatch(postTrack(track)).unwrap();
            toast.success("Track was successfully added!");
            navigate("/artists");
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            {isPostLoading ? (
                <CircularProgress />
            ) : (
                <TrackForm onSubmitTracks={onSubmitForm} />
            )}
        </>
    );
};

export default NewTrack;
