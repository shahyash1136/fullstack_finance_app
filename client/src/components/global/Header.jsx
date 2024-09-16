import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext } from "../../theme";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import Profile from "../Profile/Profile";

const Header = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  return (
    <Box display='flex' justifyContent='flex-end' p={2}>
      {/* SEARCH BAR */}

      {/* ICONS */}
      <Box display='flex' alignItems='center'>
        <IconButton
          sx={{ width: 42, height: 42 }}
          onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <Profile />
      </Box>
    </Box>
  );
};

export default Header;
