import {Button, Menu, MenuItem} from "@mui/material";
import * as React from "react";
import {useState} from "react";

import {NavLink} from "react-router-dom";


const AddFormMenu = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    return (
        <>
            <Button
                onClick={handleClick}
                color={"inherit"}
            >
                Add
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem  to={"/add-artist"} component={NavLink}>Add Artist</MenuItem>
                <MenuItem to={"/add-album"} component={NavLink}>Add Album</MenuItem>
                <MenuItem to={"/add-track"} component={NavLink}>Add Track</MenuItem>
            </Menu>
        </>

    );
};

export default AddFormMenu;