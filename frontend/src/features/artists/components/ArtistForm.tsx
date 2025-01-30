import { ChangeEvent, FormEvent, useState } from 'react';
import Grid from '@mui/material/Grid2';
import {Button, Card, TextField, Typography,} from '@mui/material';
import FileInput from "../../../components/FileInput/FileInput.tsx";
import Container from "@mui/material/Container";
import * as React from "react";
import {IArtist} from "../../../types";

interface Props {
    onSubmit: (artist: IArtist) => void;
}

const initialState = {
    user: "",
    name: "",
    photo: null,
    information: "",
};

const ArtistForm: React.FC<Props> = ({ onSubmit }) => {
    const [form, setForm] = useState<IArtist>(initialState);

    const submitFormHandler = (e: FormEvent) => {
        e.preventDefault();
        onSubmit({ ...form });
    };

    const inputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
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
                        <Typography component="h4" variant="h5" sx={{mt:5, textAlign: "center" }}>Add new artist</Typography>
                        <Grid size={{ xs: 12 }}>
                            <TextField
                                id="name"
                                name="name"
                                label="Name of artist"
                                sx={{width: "100%"}}
                                required
                                value={form.name}
                                onChange={inputChangeHandler}
                            />
                        </Grid>

                        <Grid size={{ xs: 12 }}>
                            <TextField
                                id="information"
                                name="information"
                                label="Information of artist"
                                sx={{width: "100%"}}
                                required
                                value={form.information}
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
                                Add artist
                            </Button>
                        </Grid>
                    </Grid>
                </Card>
            </Container>
        </form>
    );
};

export default ArtistForm;
