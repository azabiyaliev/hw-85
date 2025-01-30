import {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import Grid from '@mui/material/Grid2';
import {
    Button,
    Card,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
    TextField,
    Typography,
} from '@mui/material';
import Container from "@mui/material/Container";
import * as React from "react";
import {ITrack} from "../../../types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {artistsResponse} from "../../artists/artistsSlice.ts";
import {fetchAlbums} from "../../albums/albumsThunk.ts";
import {fetchArtists} from "../../artists/artistsThunk.ts";
import {albumsResponse} from "../../albums/albumsSlice.ts";

interface PropsTracks {
    onSubmitTracks: (track: ITrack) => void;
}

const initialState = {
    user: "",
    album: {_id: "", artist: ""},
    title: "",
    trackNumber: 0,
    duration: 0,
};

const TrackForm: React.FC<PropsTracks> = ({onSubmitTracks}) => {
    const [form, setForm] = useState<ITrack>(initialState);
    const artists = useAppSelector(artistsResponse);
    const albums = useAppSelector(albumsResponse);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchArtists());
        if(form.album.artist)
            dispatch(fetchAlbums(form.album.artist))
    }, [dispatch, form]);

    const submitFormHandler = (e: FormEvent) => {
        e.preventDefault();
        onSubmitTracks({ ...form });
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevState) => ({ ...prevState, [name]: value }));
    };

    const selectChangeHandler = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setForm((prevState) => ({ ...prevState, album:{...prevState.album, [name]: value }}));
    };


    return (
        <form onSubmit={submitFormHandler}>
            <Container maxWidth="xl">
                <Card
                    sx={{
                        width: "50%",
                        borderRadius: "10px",
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.6)',
                        marginTop: 5,
                        mx: "auto",
                        p: 2,
                    }}
                >
                    <Grid container direction="column" spacing={2}>
                        <Typography component="h4" variant="h5" sx={{mt:5, textAlign: "center" }}>Add new track</Typography>
                        <Grid size={{ xs: 12 }}>
                            <FormControl fullWidth>
                                <InputLabel id="artist">Artists</InputLabel>
                                <Select
                                    labelId="artist"
                                    id="artist"
                                    value={form.album.artist}
                                    name="artist"
                                    required
                                    label="Artist"
                                    onChange={selectChangeHandler}
                                >
                                    <MenuItem value="" disabled>
                                        Select artist
                                    </MenuItem>
                                    {artists.map((artist) => (
                                        <MenuItem key={artist._id} value={artist._id}>
                                            {artist.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                        {form.album.artist ? (
                            <Grid size={12}>
                                <FormControl fullWidth>
                                    <InputLabel id="_id">Albums</InputLabel>
                                    <Select
                                        labelId="_id"
                                        id="_id"
                                        value={form.album._id}
                                        name="_id"
                                        required
                                        label="Album"
                                        onChange={selectChangeHandler}
                                    >
                                        <MenuItem value="" disabled>
                                            Select album
                                        </MenuItem>
                                        {albums.map((album) => (
                                            <MenuItem key={album._id} value={album._id}>
                                                {album.title}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        ): null}
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                id="title"
                                name="title"
                                label="Title"
                                sx={{width: "100%"}}
                                required
                                value={form.title}
                                onChange={inputChangeHandler}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                id="trackNumber"
                                name="trackNumber"
                                label="trackNumber"
                                sx={{width: "100%"}}
                                required
                                value={form.trackNumber}
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                id="duration"
                                name="duration"
                                label="duration"
                                sx={{width: "100%"}}
                                required
                                value={form.duration}
                                onChange={inputChangeHandler}
                            />
                        </Grid>


                        <Grid>
                            <Button type="submit" color="primary">
                                Add track
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </form>
    );
};

export default TrackForm;
