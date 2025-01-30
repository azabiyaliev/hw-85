import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {artistsResponse, isLoading} from "../artistsSlice.ts";
import {useEffect} from "react";
import {fetchArtists} from "../../store/thunks/thunks.ts";
import {
    Card,
    CardActionArea,
    CardContent,
    CardHeader,
    CardMedia,
    CircularProgress,
    Container,
    Typography
} from "@mui/material";
import Grid from '@mui/material/Grid2';
import {apiUrl} from "../../../globalConstants.ts";
import {NavLink} from "react-router-dom";
import {selectUser} from "../../users/usersSlice.ts";


const Artists = () => {

    const dispatch = useAppDispatch();
    const artists = useAppSelector(artistsResponse);
    const loading = useAppSelector(isLoading);
    const user = useAppSelector(selectUser);
    console.log(user);
    console.log(artists);

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
                                {artists.map((artist) => {
                                    if(!artist.isPublished && !(user && (user._id === artist.user || user.role === "admin"))) {
                                        return null;
                                    }
                                    return (
                                        <Grid key={artist._id} size={6}>
                                            <Card sx={{ maxWidth: 345, mb: 2, mt: 10, boxShadow: 20 }}>
                                                <CardActionArea to={`/albums/${artist._id}`} component={NavLink}>
                                                    <CardHeader title={artist.name}/>
                                                    <CardMedia
                                                        style={{width: "100%"}}
                                                        height={400}
                                                        component="img"
                                                        image={apiUrl + "/" + artist.photo}
                                                        title={artist.name}
                                                />
                                                    {(user && user.role === "admin") ?
                                                    (artist.isPublished === true ? <CardContent>Is published</CardContent> : <CardContent>Not published</CardContent>)
                                                    : null}
                                                    {(user && user._id === artist.user && !artist.isPublished) ?
                                                    (<CardContent>Not published</CardContent>)
                                                    : null}
                                                </CardActionArea>
                                            </Card>
                                        </Grid>
                                    )
                                })}
                            </>
                        )}
                    </>
                )}
            </Grid>
        </Container>
    );
};

export default Artists;