import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Avatar,
  Box,
  Button,
} from "@mui/material";

import NotificationsIcon from "@mui/icons-material/Notifications";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

function Header({ onMenuClick }) {
  const navigate = useNavigate();
  const username = localStorage.getItem("hospitalUsername") || "Admin";

  const handleLogout = () => {
    localStorage.removeItem("hospitalLoggedIn");
    localStorage.removeItem("hospitalUsername");
    navigate("/login", { replace: true });
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: { xs: "100%", md: "calc(100% - 240px)" },
        ml: { xs: 0, md: "240px" },
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between", gap: 1 }}>
        <Box sx={{ display: "flex", alignItems: "center", minWidth: 0 }}>
          <IconButton
            color="inherit"
            aria-label="Open navigation menu"
            onClick={onMenuClick}
            sx={{ display: { xs: "inline-flex", md: "none" }, mr: 1 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            sx={{ fontSize: { xs: "1rem", sm: "1.25rem" } }}
          >
            IJABO PATIENT MANAGEMENT
          </Typography>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", flexShrink: 0 }}>
          <IconButton color="inherit">
            <NotificationsIcon />
          </IconButton>

          <Avatar sx={{ mr: 1 }}>{username.charAt(0).toUpperCase()}</Avatar>

          <Button
            color="inherit"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            sx={{ display: { xs: "none", sm: "inline-flex" } }}
          >
            Logout
          </Button>

          <IconButton
            color="inherit"
            onClick={handleLogout}
            aria-label="Logout"
            sx={{ display: { xs: "inline-flex", sm: "none" } }}
          >
            <LogoutIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
