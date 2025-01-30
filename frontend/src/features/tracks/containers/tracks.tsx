import {useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {useEffect} from "react";
import {fetchAlbums, fetchTracks, trackHistoryFetch} from "../../store/thunks/thunks.ts";
import {isLoading, tracksResponse} from "../tracksSlice.ts";
import {albumsResponse} from "../../albums/albumsSlice.ts";
import {
    Button,
    CircularProgress,
    Container,
    Typography
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {selectUser} from "../../users/usersSlice.ts";


const Tracks = () => {

    const params = useParams<{idAlbum: string}>();
    const user = useAppSelector(selectUser);

    const dispatch = useAppDispatch();
    const tracks = useAppSelector(tracksResponse);
    const albums = useAppSelector(albumsResponse);
    const loading = useAppSelector(isLoading);
    const idArtist = tracks[0]?.album?.artist;
    const artistName = albums[0]?.artist?.name;
    const albumName = tracks[0]?.album?.title;

    useEffect(() => {
        if(params.idAlbum)
            dispatch(fetchTracks(params.idAlbum));
        if(idArtist)
            dispatch(fetchAlbums(String(idArtist)));
    }, [dispatch, params.idAlbum, idArtist]);

    const onPlay = async (trackHistory: {track: string, datetime: Date}) => {
        await dispatch(trackHistoryFetch(trackHistory));
    }

    return (
        <Container maxWidth="lg">

            <Grid container direction={"column"}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {tracks.length === 0 && !loading ? (
                            <Typography variant="h6">
                                No tracks yet
                            </Typography>
                        ) : (
                            <>
                                <Grid size={12}>
                                    <Typography sx={{mt: 4}} variant="h4">
                                        {!artistName ? "Not found Artist" : artistName}
                                    </Typography>
                                    <Typography sx={{mt: 4, mb: 4}} variant="h4">
                                        {!albumName ? "Not found Album" : albumName}
                                    </Typography>
                                </Grid>
                                {tracks.map((track) => (
                                    <Grid key={track._id} size={4} sx={{ mb: 2}}>
                                        <Typography>
                                            {`${track.trackNumber}.  ${track.title}`}
                                        </Typography>
                                        <Typography>
                                            Duration: {track.duration}
                                        </Typography>
                                        {user ? <Button onClick={() => onPlay({track: track._id, datetime: new Date()}) }>Play</Button> : null}
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

export default Tracks;