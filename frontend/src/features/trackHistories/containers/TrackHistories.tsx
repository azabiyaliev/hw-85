import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {isLoading, tracksHistoriesResponse} from "../trackHistoriesSlice.ts";
import {useEffect} from "react";
import {trackHistoryGet} from "../trackHistoriesThunk.ts";
import {Card, CardContent, CircularProgress, Container, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import dayjs from "dayjs";
import {useNavigate} from "react-router-dom";
import {selectUser} from "../../users/usersSlice.ts";

const TrackHistories = () => {
    const user = useAppSelector(selectUser);
    const dispatch = useAppDispatch();
    const trackHistories = useAppSelector(tracksHistoriesResponse)
    const loading = useAppSelector(isLoading)
    const navigate = useNavigate();

    if(!user) {
        navigate("/login");
    }


    useEffect(() => {
        dispatch(trackHistoryGet());
    },[dispatch])

    return (
        <Container maxWidth="lg">
            <Grid container direction={"row"}>
                {loading ? (
                    <CircularProgress />
                ) : (
                    <>
                        {trackHistories.length === 0 && !loading ? (
                            <Typography variant="h6">
                                No tracks yet
                            </Typography>
                        ) : (
                            <>
                                <Grid size={12}>
                                    <Typography sx={{mt: 4}} variant="h4">
                                    </Typography>
                                    <Typography sx={{mt: 4, mb: 4}} variant="h4">
                                    </Typography>
                                </Grid>
                                {trackHistories.map((track) => (
                                    <Grid key={track._id} size={2} sx={{ mb: 4}}>
                                        <Card sx={{me: 2}}>
                                            <CardContent></CardContent>
                                            <CardContent>{track.track.title}</CardContent>
                                            <CardContent>{dayjs(track.datetime).format("DD-MM-YYYY")}</CardContent>
                                        </Card>
                                        <Typography>
                                        </Typography>
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

export default TrackHistories;