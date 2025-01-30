import ArtistForm from "../components/ArtistForm.tsx";
import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import {IArtist} from "../../../types";
import {toast} from "react-toastify";
import {selectLoadingArtistPost} from "../artistsSlice.ts";
import {postArtist} from "../artistsThunk.ts";

const NewArtist = () => {
    const dispatch = useAppDispatch();
    const isPostLoading = useAppSelector(selectLoadingArtistPost);
    const navigate = useNavigate();

    const onSubmitForm = async (artist: IArtist) => {
        try {
            await dispatch(postArtist(artist)).unwrap();
            toast.success("Artist was successfully added!");
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
                <ArtistForm onSubmit={onSubmitForm} />
            )}
        </>
    );
};

export default NewArtist;
