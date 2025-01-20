import {Button, Menu, MenuItem} from "@mui/material";
import {IUser} from "../../types";
import * as React from "react";
import {useState} from "react";

interface Props {
    user: IUser
}


const UserMenu: React.FC<Props> = ({user}) => {

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
                Hello, {user.username}!
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem>Profile</MenuItem>
                <MenuItem>My account</MenuItem>
                <MenuItem>Logout</MenuItem>
            </Menu>
        </>

    );
};

export default UserMenu;