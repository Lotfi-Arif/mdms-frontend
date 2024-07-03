// src/app/components/NavBar.tsx
"use client";
import React from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "../../store";
import { logout } from "../../store/auth/authSlice";
import { useRouter } from "next/navigation";
import Link from "next/link";

const NavBar: React.FC = () => {
  const { isAuthenticated, user } = useSelector(
    (state: RootState) => state.auth
  );
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const handleLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <Box
      sx={{
        width: 240,
        backgroundColor: "#2c3e50",
        color: "white",
        height: "100vh",
        padding: 2,
      }}
    >
      <Typography variant="h6" sx={{ mb: 4, textAlign: "center" }}>
        Master&apos;s Dissertation Management System
      </Typography>
      <List component="nav">
        <ListItemButton component={Link} href="/dashboard">
          <ListItemText primary="My Progress" />
        </ListItemButton>
        <ListItemButton component={Link} href="/submission">
          <ListItemText primary="Submission" />
        </ListItemButton>
        <ListItemButton component={Link} href="/project-list">
          <ListItemText primary="Project List" />
        </ListItemButton>
        <ListItemButton component={Link} href="/lecturer-list">
          <ListItemText primary="Lecturer List" />
        </ListItemButton>
        <ListItemButton component={Link} href="/student-progress">
          <ListItemText primary="Student Progress" />
        </ListItemButton>
        <ListItemButton component={Link} href="/viva-voce">
          <ListItemText primary="Viva Voce" />
        </ListItemButton>
        <ListItemButton component={Link} href="/viva-evaluation">
          <ListItemText primary="Viva Evaluation" />
        </ListItemButton>
      </List>
      {isAuthenticated && (
        <Box sx={{ mt: 4, textAlign: "center" }}>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Logged in as: {user?.firstName}
          </Typography>
          <Button variant="outlined" color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default NavBar;
