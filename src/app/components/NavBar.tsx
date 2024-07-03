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
        {getNavItems().map((item, index) => (
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
};

export default NavBar;
