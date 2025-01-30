import {Button, Menu, MenuItem} from "@mui/material";
import {IUser} from "../../types";
import * as React from "react";
import {useState} from "react";
import {useAppDispatch} from "../../app/hooks.ts";
import {unsetUser} from "../../features/users/usersSlice.ts";
import {logout} from "../../features/store/thunks/thunks.ts";

interface Props {
    user: IUser
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }

    const handleClose = () => {
        setAnchorEl(null);
    }

    const handleLogout = () => {
        dispatch(logout());
        dispatch(unsetUser());
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
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>

    );
};

export default UserMenu;