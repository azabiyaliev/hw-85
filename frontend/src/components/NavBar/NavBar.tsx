import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import {NavLink} from "react-router-dom";


const NavBar = () => {
    return (
        <>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" to="/" component={NavLink} sx={{ textDecoration: 'none', color:"inherit" }}>
                            MusicChannel
                        </Typography>
                    </Toolbar>
                </AppBar>
            </Box>
        </>
    );
};

export default NavBar;