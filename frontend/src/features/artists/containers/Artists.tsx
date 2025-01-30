import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {artistsResponse, isLoading} from "../artistsSlice.ts";
import {useEffect} from "react";
import {fetchArtists} from "../artistsThunk.ts";
import {
    Box,
    Button,
    Card,
    CardActionArea, CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    CircularProgress,
    Container, IconButton,
    Typography
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid2';
import {apiUrl} from "../../../globalConstants.ts";
import {NavLink, useNavigate} from "react-router-dom";
import {selectUser} from "../../users/usersSlice.ts";
import {deleteArtistById, togglePublished} from "../artistsThunk.ts";

const Artists = () => {

    const dispatch = useAppDispatch();
    const artists = useAppSelector(artistsResponse);
    const loading = useAppSelector(isLoading);
    const user = useAppSelector(selectUser);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(fetchArtists());
    }, [dispatch])

    const deleteArtist = async (id: string) => {
        await dispatch(deleteArtistById(id))
        navigate(`/artists`)
    }

    const published = async (id: string) => {
        await dispatch(togglePublished(id));
        navigate(`/artists`)
    }

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

                                    if(!artist.isPublished && !(user && (user._id === artist.user || user.role === "admin"))) return null;

                                    return (
                                        <Grid key={artist._id} size={4}>
                                            <Card sx={{ maxWidth: 345, mb: 2, mt: 5, boxShadow: 20 }}>
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
                                                    (!artist.isPublished ? (
                                                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                                            <CardContent>Not published</CardContent>
                                                            <Button onClick={() => published(artist._id)}>Published</Button>
                                                        </Box>
                                                    ): null)
                                                    : null}
                                                    {(user && user._id === artist.user && !artist.isPublished) ?
                                                        (<CardContent>Not published</CardContent>)
                                                        : null}
                                                    {(user && (user.role === "admin" || (user._id === artist.user && !artist.isPublished))) ? (
                                                        <>
                                                            <CardActions>
                                                                <IconButton onClick={() => deleteArtist(artist._id)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </CardActions>
                                                        </>
                                                    ) : null}
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