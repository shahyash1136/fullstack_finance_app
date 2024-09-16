import { useState, useEffect } from "react";
import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Typography,
  useTheme,
} from "@mui/material";
import Person from "@mui/icons-material/Person";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/features/AuthSlice";
import { tokens } from "../../theme";
import { getInitials, getRandomColor } from "../../utils/common";

const Profile = () => {
  const dispatch = useDispatch();

  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [anchorEl, setAnchorEl] = useState(null);
  const { data } = useSelector((state) => state.user);

  const open = Boolean(anchorEl);
  const [bgColor, setBgColor] = useState(""); // State to store the background color

  useEffect(() => {
    // Set random color only once when the component mounts
    setBgColor(getRandomColor());
  }, []); // Empty dependency array to ensure it runs only on mount

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const initials = getInitials(`${data?.first_name} ${data?.last_name}`);

  return (
    <>
      <IconButton
        onClick={handleClick}
        size='small'
        sx={{ ml: 2 }}
        aria-controls={open ? "account-menu" : undefined}
        aria-haspopup='true'
        aria-expanded={open ? "true" : undefined}>
        {data?.profile_picture !== null ? (
          <Avatar
            alt={`${data?.first_name} ${data?.last_name}`}
            sx={{ width: 42, height: 42 }}
            src={data?.profile_picture}
          />
        ) : (
          <Avatar
            sx={{
              width: 42,
              height: 42,
              bgcolor: bgColor,
              color: "white",
              fontSize: 14,
            }}>
            {initials}
          </Avatar>
        )}
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        id='account-menu'
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        slotProps={{
          paper: {
            elevation: 0,
            sx: {
              overflow: "visible",
              filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
              minWidth: 200,
              mt: 1.5,
              bgcolor: colors.primary[400],
              "& .MuiAvatar-root": {
                width: 32,
                height: 32,
                ml: -0.5,
                mr: 1,
              },
              "&::before": {
                content: '""',
                display: "block",
                position: "absolute",
                top: 0,
                right: 14,
                width: 10,
                height: 10,
                bgcolor: `${colors.primary[400]}`,
                transform: "translateY(-50%) rotate(45deg)",
                zIndex: 0,
              },
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}>
        <Box sx={{ px: 1.5, py: 1, mb: 0.5 }}>
          <Typography
            variant='h2'
            color={colors.grey[100]}
            fontWeight='bold'
            sx={{ m: "0 0 5px 0", fontSize: 16 }}>
            {`${data?.first_name} ${data?.last_name}`}
          </Typography>
          <Typography
            variant='h5'
            sx={{ fontSize: 12 }}
            color={colors.greenAccent[400]}>
            {data?.email_id}
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Person fontSize='small' />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <ListItemIcon>
            <Settings fontSize='small' />
          </ListItemIcon>
          Settings
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            dispatch(logout());
          }}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default Profile;
