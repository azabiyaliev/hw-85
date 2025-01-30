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
import FileInput from "../../../components/FileInput/FileInput.tsx";
import Container from "@mui/material/Container";
import * as React from "react";
import {IAlbum} from "../../../types";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {artistsResponse} from "../../artists/artistsSlice.ts";
import {fetchArtists} from "../../store/thunks/thunks.ts";

interface PropsAlbums {
    onSubmitAlbums: (album: IAlbum) => void;
}

const initialState = {
    user: "",
    artist: "",
    title: "",
    year: "",
    image: null,
};

const AlbumForm: React.FC<PropsAlbums> = ({onSubmitAlbums}) => {
    const [form, setForm] = useState<IAlbum>(initialState);
    const artists = useAppSelector(artistsResponse);
    const dispatch = useAppDispatch();

    useEffect(() => {
       dispatch(fetchArtists());
    }, [dispatch]);

    const submitFormHandler = (e: FormEvent) => {
        e.preventDefault();
        onSubmitAlbums({ ...form });
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prevState) => ({ ...prevState, [name]: value }));
    };

    const selectChangeHandler = (e: SelectChangeEvent) => {
        const { name, value } = e.target;
        setForm((prevState) => ({ ...prevState, [name]: value }));
    };

    const fileEventChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;

        if (files) {
            setForm((prevState) => ({
                ...prevState,
                [name]: files[0] || null,
            }));
        }
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
                        <Typography component="h4" variant="h5" sx={{mt:5, textAlign: "center" }}>Add new album</Typography>
                            <Grid size={{ xs: 12 }}>
                                <FormControl fullWidth>
                                    <InputLabel id="category">Artists</InputLabel>
                                    <Select
                                        labelId="artist"
                                        id="artist"
                                        value={form.artist}
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
                                id="year"
                                name="year"
                                label="Year"
                                sx={{width: "100%"}}
                                required
                                value={form.year}
                                onChange={inputChangeHandler}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }} >
                            <FileInput
                                name="image"
                                label="Image"
                                onGetFile={fileEventChangeHandler}
                            />
                        </Grid>

                        <Grid>
                            <Button type="submit" color="primary">
                                Add album
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </form>
    );
};

export default AlbumForm;
