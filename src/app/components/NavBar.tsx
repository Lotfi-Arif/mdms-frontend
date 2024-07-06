"use client";
import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Drawer,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useAuth } from "../../hooks/useAuth";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { logout } from "../../store/user/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

const drawerWidth = 240;

const NavBar: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  const getNavItems = () => {
    if (user?.student) {
      return [
        { text: "My Progress", href: "/student/progress" },
        { text: "Submission", href: "/student/submission" },
        { text: "Project Archive", href: "/student/project-archive" },
        { text: "Lecturer List", href: "/student/lecturer-list" },
        { text: "Viva Details", href: "/student/viva-details" },
      ];
    } else if (user?.lecturer) {
      const commonItems = [
        { text: "Dashboard", href: "/lecturer/dashboard" },
        { text: "Student List", href: "/lecturer/student-list" },
        { text: "Student Progress", href: "/lecturer/student-progress" },
        { text: "Student Submissions", href: "/lecturer/student-submissions" },
        { text: "Project Archive", href: "/lecturer/project-archive" },
        { text: "Nominations", href: "/lecturer/nominations" },
      ];

      if (user.lecturer.supervisor) {
        return [
          ...commonItems,
          { text: "Student Progress", href: "/supervisor/student-progress" },
          { text: "Nomination List", href: "/supervisor/nomination-list" },
        ];
      } else if (user.lecturer.examiner) {
        return [
          ...commonItems,
          { text: "Viva Evaluations", href: "/examiner/viva-evaluations" },
          { text: "Nomination List", href: "/examiner/nomination-list" },
          { text: "Viva Schedule", href: "/lecturer/viva-schedule" },
        ];
      }

      return commonItems;
    }

    return [];
  };

  const navItems = getNavItems();

  const drawer = (
    <Box sx={{ overflow: "auto" }}>
      <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
        MDMS
      </Typography>
      <List>
        {navItems.map((item, index) => (
          <ListItemButton key={index} component={Link} href={item.href}>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
      {isAuthenticated && user && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Logged in as: {user.firstName} {user.lastName}
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Role:{" "}
            {user.student ? "Student" : user.lecturer ? "Lecturer" : "Unknown"}
            {user.lecturer?.supervisor && " (Supervisor)"}
            {user.lecturer?.examiner && " (Examiner)"}
          </Typography>
          <Button variant="outlined" color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      )}
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
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
            Master&apos;s Dissertation Management System
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
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
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
    </>
  );
};

export default NavBar;
