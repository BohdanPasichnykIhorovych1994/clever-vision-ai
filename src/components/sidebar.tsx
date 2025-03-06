"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { HomeMax } from "@mui/icons-material";

import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import Link from "next/link";
import { Button } from "@mui/material";
import TurnLeftIcon from "@mui/icons-material/TurnLeft";
import ChatIcon from "@mui/icons-material/Chat";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import GridViewIcon from "@mui/icons-material/GridView";
import BarChartIcon from "@mui/icons-material/BarChart";
import CastConnectedIcon from "@mui/icons-material/CastConnected";
import SdStorageIcon from "@mui/icons-material/SdStorage";
import GroupIcon from "@mui/icons-material/Group";
import styles from "./Sidebar.module.css";

const drawerWidth = 240;

interface Props {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window?: () => Window;
}

export default function ResponsiveDrawer(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const menuFirst = [
    {
      id: "dashboard",
      label: "Dashboard",
      href: "/",
      icon: <GridViewIcon sx={{ color: "white" }} />,
    },
    //
    {
      id: "users",
      label: "Users",
      href: "/users",
      icon: <GroupIcon sx={{ color: "white" }} />,
    },
    {
      id: "chats,",
      label: "Chats",
      href: "/chats",
      icon: <ChatIcon sx={{ color: "white" }} />,
    },
    {
      id: "ai",
      label: "AI",
      href: "/ai",
      icon: <PrecisionManufacturingIcon sx={{ color: "white" }} />,
    },
    {
      id: "consumption",
      label: "Consumption",
      href: "/consumption",
      icon: <SdStorageIcon sx={{ color: "white" }} />,
    },
  ];
  const menuSecond = [
    {
      id: "members",
      label: "Members",
      href: "/members",
      icon: <ManageAccountsIcon sx={{ color: "white" }} />,
      flex: 1,
    },
    {
      id: "analytics",
      label: "Analytics",
      href: "/analytics",
      icon: <BarChartIcon sx={{ color: "white" }} />,
    },
    {
      id: "sockets",
      label: "Sockets",
      href: "/sockets",
      icon: <CastConnectedIcon sx={{ color: "white" }} />,
    },
  ];

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const [toolbarTitle, setToolbarTitle] = React.useState("Dashboard");
  const [activeMenu, setActiveMenu] = React.useState<string>("dashboard");

  const drawer = (
    <div>
      <Toolbar />
      <Divider sx={{ bgcolor: "white" }} />
      <List>
        {menuFirst.map((item) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              component={Link} // Використовуємо Link як компонент для кнопки
              href={item.href} // Передаємо посилання
              className={`${styles.menuItem} ${
                activeMenu === item.id ? styles.activeMenuItem : ""
              }`}
              onClick={() => {
                setToolbarTitle(item.label);
                setActiveMenu(item.id);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  color: activeMenu === item.id ? "white" : "#a0a0a0", // Активний текст білий
                  fontWeight: activeMenu === item.id ? 700 : 400, // Жирність тексту
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ bgcolor: "white" }} />
      <List>
        {menuSecond.map((item, index) => (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              component={Link} // Використовуємо Link як компонент для кнопки
              href={item.href} // Передаємо посилання
              className={`${styles.menuItem} ${
                activeMenu === item.id ? styles.activeMenuItem : ""
              }`}
              onClick={() => {
                setToolbarTitle(item.label);
                setActiveMenu(item.id);
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.label}
                sx={{
                  color: activeMenu === item.id ? "white" : "#a0a0a0", // Активний текст білий
                  fontWeight: activeMenu === item.id ? 700 : 400, // Жирність тексту
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider sx={{ bgcolor: "white" }} />
      <Box
        sx={{
          display: "flex",
          margin: "200px 0 0 50px",
        }}
      >
        <Button sx={{ color: "white", fontWeight: 700 }} variant="text">
          <TurnLeftIcon />
          Log Out
        </Button>
      </Box>
    </div>
  );

  // Remove this const when copying and pasting into your project.

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar sx={{ color: "black", background: "white" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {toolbarTitle}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{
          width: { sm: drawerWidth },
          flexShrink: { sm: 0 },
        }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          // container={container}
          variant="temporary"
          open={mobileOpen}
          onTransitionEnd={handleDrawerTransitionEnd}
          onClose={handleDrawerClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              background: "rgb(0, 0, 0)",
              color: "white",
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}
