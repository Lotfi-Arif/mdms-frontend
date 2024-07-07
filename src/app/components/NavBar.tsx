"use client";
import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";

const NavBar: React.FC = () => {
  const { currentUser, logoutUser } = useAuth();

  if (!currentUser) return null;

  const isLecturer = !!currentUser.lecturer;
  const isStudent = !!currentUser.student;
  const isSupervisor = isLecturer && !!currentUser.lecturer?.supervisor;
  const isExaminer = isLecturer && !!currentUser.lecturer?.examiner;

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          MDMS
        </Typography>
        <Box>
          {isStudent && (
            <>
              <Button color="inherit" component={Link} href="/student/progress">
                Progress
              </Button>
              <Button
                color="inherit"
                component={Link}
                href="/student/submission"
              >
                Submission
              </Button>
              <Button
                color="inherit"
                component={Link}
                href="/student/viva-details"
              >
                Viva Details
              </Button>
            </>
          )}
          {isLecturer && (
            <>
              <Button
                color="inherit"
                component={Link}
                href="/lecturer/dashboard"
              >
                Dashboard
              </Button>
              <Button
                color="inherit"
                component={Link}
                href="/lecturer/student-list"
              >
                Students
              </Button>
            </>
          )}
          {isSupervisor && (
            <>
              <Button
                color="inherit"
                component={Link}
                href="/lecturer/nominations"
              >
                Nominations
              </Button>
              <Button
                color="inherit"
                component={Link}
                href="/lecturer/student-progress"
              >
                Student Progress
              </Button>
            </>
          )}
          {isExaminer && (
            <>
              <Button
                color="inherit"
                component={Link}
                href="/examiner/nominations"
              >
                Nominations
              </Button>
              <Button
                color="inherit"
                component={Link}
                href="/examiner/viva-evaluations"
              >
                Viva Evaluations
              </Button>
            </>
          )}
          <Button color="inherit" onClick={logoutUser}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
