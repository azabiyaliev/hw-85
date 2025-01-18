import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {artistsResponse, isLoading} from "./artistsSlice.ts";
import {useEffect} from "react";
import {fetchArtists} from "../store/thunks/thunks.ts";
import {Card, CardActionArea, CardHeader, CardMedia, CircularProgress, Container, Typography} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {apiUrl} from "../../../globalConstants.ts";
import {NavLink} from "react-router-dom";


const Artists = () => {

    const dispatch = useAppDispatch();
    const artists = useAppSelector(artistsResponse);
    const loading = useAppSelector(isLoading);
    console.log(artists);
    console.log(apiUrl);

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch])

    return (
        <Container maxWidth="lg">
            <Grid container direction={"row"}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {artists.length === 0 && !loading ? (
                            <Typography variant="h6">
                                No artists yet
                            </Typography>
                        ) :(
                            <>
                                {artists.map((artist) => (
                                    <Grid size={6}>
                                        <Card key={artist._id} sx={{ maxWidth: 345, mb: 2, mt: 10, boxShadow: 20 }}>
                                            <CardActionArea to={"/albums"} component={NavLink}>
                                                <CardHeader title={artist.name}/>
                                                <CardMedia
                                                    style={{width: "100%"}}
                                                    height={400}
                                                    component="img"
                                                    image={apiUrl + "/" + artist.photo}
                                                    title={artist.name}
                                                />
                                            </CardActionArea>

                                        </Card>
                                    </Grid>
                                ))}
                            </>
                        )}
                    </>
                )}
            </Grid>

        </Container>
    );
};

export default Artists;