import { useState } from 'react';
import {ILogin} from "../../../types";
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid2';
import Box from '@mui/material/Box';
import LockOpenIcon from "@mui/icons-material/LockOpen";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import {Alert, Avatar, Button} from '@mui/material';
import {useAppDispatch, useAppSelector} from "../../../app/hooks.ts";
import {NavLink, useNavigate} from 'react-router-dom';
import {googleLogin, login} from "../usersThunk.ts";
import * as React from "react";
import {selectLoginError} from "../usersSlice.ts";
import {GoogleLogin} from "@react-oauth/google";

const LoginPage = () => {
    const dispatch = useAppDispatch();
    const loginError = useAppSelector(selectLoginError);
    const navigate = useNavigate();
    const [form, setForm] = useState<ILogin>({
        username: "",
        password: "",
        displayName: "",
        avatar: null
    });


    const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setForm(prevState => ({...prevState, [name]: value}));
    };

    const submitHandler = async (e: React.FormEvent) => {
        e.preventDefault();
        await dispatch(login(form)).unwrap();
        navigate('/');
    }

    const googleLoginHandler = async (credential: string) => {
        await dispatch(googleLogin(credential)).unwrap();
        navigate('/');
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOpenIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                {loginError && (
                    <Alert severity="error" sx={{mt: 3, width: "100%"}}>
                        {loginError.error}
                    </Alert>
                )}

                <Box sx={{mt: 2}}>
                    <GoogleLogin onSuccess={(credentialResponse) => {
                        if (credentialResponse.credential) {
                            void googleLoginHandler(credentialResponse.credential);
                        }
                    }}
                    onError={() => alert("Login failed!")}/>
                </Box>
                <Box component="form" noValidate onSubmit={submitHandler} sx={{ mt: 3 }}>
                    <Grid container direction={'column'} size={12} spacing={2}>
                        <Grid size={12}>
                            <TextField
                                fullWidth
                                id="username"
                                label="Username"
                                name="username"
                                value={form.username}
                                onChange={inputChangeHandler}
                            />
                        </Grid>

                        <Grid size={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={form.password}
                                onChange={inputChangeHandler}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid >
                            <NavLink to={"/register"}>
                                No account yet? Sign Up
                            </NavLink>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginPage;