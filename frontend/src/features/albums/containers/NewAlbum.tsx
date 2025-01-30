import { useAppDispatch, useAppSelector } from "../../../app/hooks.ts";
import { useNavigate } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import {IAlbum} from "../../../types";
import {toast} from "react-toastify";
import AlbumForm from "../components/AlbumForm.tsx";
import {selectLoadingAlbumPost} from "../albumsSlice.ts";
import {postAlbum} from "../albumsThunk.ts";

const NewAlbum = () => {
    const dispatch = useAppDispatch();
    const isPostLoading = useAppSelector(selectLoadingAlbumPost);
    const navigate = useNavigate();

    const onSubmitForm = async (album: IAlbum) => {
        try {
            await dispatch(postAlbum(album)).unwrap();
            toast.success("Album was successfully added!");
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
                <AlbumForm onSubmitAlbums={onSubmitForm} />
            )}
        </>
    );
};

export default NewAlbum;
