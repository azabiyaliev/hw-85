import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useEffect} from "react";
import {fetchAlbums} from "../albumsThunk.ts";
import {albumsResponse, isLoading} from "../albumsSlice.ts";
import {NavLink, useNavigate, useParams} from "react-router-dom";
import Grid from "@mui/material/Grid2";
import {
    Box, Button,
    Card, CardActionArea, CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    CircularProgress,
    Container, IconButton,
    Typography
} from "@mui/material";
import {apiUrl} from "../../../globalConstants.ts";
import {selectUser} from "../../users/usersSlice.ts";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteAlbumById, togglePublishedAlbum} from "../albumsThunk.ts";

const Albums = () => {

    const params = useParams<{idArtist: string}>();
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const albums = useAppSelector(albumsResponse);
    const loading = useAppSelector(isLoading);
    const artistName = albums[0]?.artist?.name;
    const navigate = useNavigate();

    useEffect(() => {
        if(params.idArtist)
        dispatch(fetchAlbums(params.idArtist));
    }, [dispatch, params.idArtist]);

    const deleteAlbum = async (id: string) => {
        await dispatch(deleteAlbumById(id))
        navigate(`/`)
    }

    const publishedAlbum = async (id: string) => {
        await dispatch(togglePublishedAlbum(id));
        navigate(`/artists`)
    }

    return (
        <Container maxWidth="lg">
            <Grid container direction={"row"}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {albums.length === 0 && !loading ? (
                            <Typography variant="h6">
                                No albums yet
                            </Typography>
                        ) : (
                            <>
                                <Grid size={12}>
                                    <Typography sx={{mt: 4}} variant="h4">
                                        {!artistName ? "Not found Artist" : artistName}
                                    </Typography>
                                </Grid>
                                {albums.map((album) => {

                                    if(!album.isPublished && !(user && (user._id === album.user || user.role === "admin"))) {
                                        return null;
                                    }
                                    return (
                                    <Grid key={album._id} size={6}>
                                        <CardActionArea to={`/tracks/${album._id}`} component={NavLink}>
                                            <Card sx={{ maxWidth: 345, mb: 2, mt: 5, boxShadow: 20 }}>
                                                <CardHeader title={album.title}/>
                                                <CardMedia
                                                    style={{width: "100%"}}
                                                    height={400}
                                                    component="img"
                                                    image={apiUrl + "/" + album.image}
                                                    title={album.title}
                                                />
                                                <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                                    <CardContent>
                                                        Released in year: {album.year}.
                                                    </CardContent>
                                                    {(user && (user.role === "admin" || (user._id === album.user && !album.isPublished))) ? (
                                                        <>
                                                            <CardActions>
                                                                <IconButton onClick={() => deleteAlbum(album._id)}>
                                                                    <DeleteIcon />
                                                                </IconButton>
                                                            </CardActions>
                                                        </>
                                                    ) : null}
                                                </Box>
                                                {(user && user.role === "admin") ?
                                                    (!album.isPublished ? (
                                                        <Box sx={{display: "flex", justifyContent: "space-between"}}>
                                                            <CardContent>Not published</CardContent>
                                                            <Button onClick={() => publishedAlbum(album._id)}>Published</Button>
                                                        </Box>
                                                    ): null)
                                                    : null}
                                                {(user && user._id === album.user && !album.isPublished) ?
                                                    (<CardContent>Not published</CardContent>)
                                                    : null}
                                            </Card>
                                        </CardActionArea>
                                    </Grid>
                                    )})}
                            </>
                        )}
                    </>
                )}
            </Grid>
        </Container>
    );
};

export default Albums;