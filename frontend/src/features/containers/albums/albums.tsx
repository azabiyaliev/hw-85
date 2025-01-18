import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useEffect} from "react";
import {fetchAlbums} from "../store/thunks/thunks.ts";
import {albumsResponse, isLoading} from "./albumsSlice.ts";
import {useParams} from "react-router-dom";
import Grid from "@mui/material/Grid2";
import {
    Card,
    CardContent,
    CardHeader,
    CardMedia,
    CircularProgress,
    Container,
    Typography
} from "@mui/material";
import {apiUrl} from "../../../globalConstants.ts";


const Albums = () => {

    const params = useParams<{idArtist: string}>();

    const dispatch = useAppDispatch();
    const albums = useAppSelector(albumsResponse);
    const loading = useAppSelector(isLoading);
    console.log(albums)
    console.log(params)

    useEffect(() => {
        if(params.idArtist)
        dispatch(fetchAlbums(params.idArtist));
    }, [dispatch, params.idArtist]);

    return (
        <Container maxWidth="lg">
            <Grid container direction={"row"}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {albums.length === 0 && !loading ? (
                            <Typography variant="h6">
                                No artists yet
                            </Typography>
                        ) :(
                            <>
                                {albums.map((album) => (
                                    <Grid key={album._id} size={6}>
                                        <Card sx={{ maxWidth: 345, mb: 2, mt: 10, boxShadow: 20 }}>
                                                <CardHeader title={album.title}/>
                                                <CardMedia
                                                    style={{width: "100%"}}
                                                    height={400}
                                                    component="img"
                                                    image={apiUrl + "/" + album.image}
                                                    title={album.title}
                                                />
                                            <CardContent>
                                                Released in year: {album.year}.
                                            </CardContent>

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

export default Albums;