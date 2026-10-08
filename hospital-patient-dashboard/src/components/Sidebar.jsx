import {
  Dashboard,
  People,
  MedicalServices,
  Event,
  Description,
  Business,
} from "@mui/icons-material";

import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  Box,
  useMediaQuery,
} from "@mui/material";

import { NavLink } from "react-router-dom";

const drawerWidth = 240;

function Sidebar({ mobileOpen, onMobileClose }) {
  const isDesktop = useMediaQuery("(min-width: 900px)");
  const menuItems = [
    {
      text: "Dashboard",
      path: "/",
      icon: <Dashboard />,
    },
    {
      text: "Patients",
      path: "/patients",
      icon: <People />,
    },
    {
      text: "Doctors",
      path: "/doctors",
      icon: <MedicalServices />,
    },
    {
      text: "Appointments",
      path: "/appointments",
      icon: <Event />,
    },
    {
      text: "Medical Records",
      path: "/medical-records",
      icon: <Description />,
    },
    {
      text: "Departments",
      path: "/departments",
      icon: <Business />,
    },
  ];

  return (
    <Drawer
      variant={isDesktop ? "permanent" : "temporary"}
      open={isDesktop || mobileOpen}
      onClose={onMobileClose}
      sx={{
        width: isDesktop ? drawerWidth : undefined,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar>
        <Box>
          <Typography variant="h6" fontWeight="bold">
            Hospital
          </Typography>

          <Typography variant="body2" color="text.secondary">
            Patient Management
          </Typography>
        </Box>
      </Toolbar>

      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            component={NavLink}
            to={item.path}
            onClick={onMobileClose}
          >
            <ListItemIcon>{item.icon}</ListItemIcon>

            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;