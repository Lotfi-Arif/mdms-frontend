"use client";

import React, { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import {
  Box,
  Typography,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

// You'll need to create these hooks or adjust based on your actual implementation
import { useStudent } from "@/hooks/useStudent";
import { useLecturer } from "@/hooks/useLecturer";

export default function Dashboard() {
  const { currentUser } = useAuth();
  const router = useRouter();
  const { currentStudent, fetchStudentByEmail } = useStudent();
  const { currentLecturer, fetchLecturerById } = useLecturer();

  useEffect(() => {
    if (currentUser) {
      if (currentUser.student) {
        fetchStudentByEmail(currentUser.email);
      } else if (currentUser.lecturer) {
        fetchLecturerById(currentUser.lecturer.id);
      }
    } else {
      router.push("/login");
    }
  }, [currentUser, router, fetchStudentByEmail, fetchLecturerById]);

  if (!currentUser) {
    return (
      <Typography color="error">
        An error occurred: User not found. Please log in again.
      </Typography>
    );
  }

  const isStudent = currentUser.student;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>
        {isStudent ? "Student Dashboard" : "Lecturer Dashboard"}
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Personal Information
            </Typography>
            <Typography>
              Name: {currentUser.firstName} {currentUser.lastName}
            </Typography>
            <Typography>Email: {currentUser.email}</Typography>
            {isStudent && currentStudent && (
              <Typography>
                Matric Number: {currentUser.student?.matricNumber}
              </Typography>
            )}
            {!isStudent && currentLecturer && (
              <Typography>
                Staff Number: {currentLecturer.lecturer.staffNumber}
              </Typography>
            )}
          </Paper>
        </Grid>
        {isStudent && currentStudent && currentStudent.student && (
          <>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Submissions
                </Typography>
                <List>
                  {currentStudent.student.submissions.map(
                    (submission, index) => (
                      <ListItem key={submission.id}>
                        <ListItemText
                          primary={`Submission ${index + 1}`}
                          secondary={new Date(
                            submission.createdAt
                          ).toLocaleDateString()}
                        />
                      </ListItem>
                    )
                  )}
                </List>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push("/student/submission")}
                >
                  New Submission
                </Button>
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Supervisor
                </Typography>
                {currentStudent.student.supervisor ? (
                  <Typography>
                    {currentStudent.student.supervisor.firstName}{" "}
                    {currentStudent.student.supervisor.lastName}
                  </Typography>
                ) : (
                  <Typography>No supervisor assigned yet.</Typography>
                )}
              </Paper>
            </Grid>
          </>
        )}
        {!isStudent && currentLecturer && (
          <>
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom>
                  Supervised Students
                </Typography>
                <List>
                  {currentLecturer.lecturer.supervisor?.assignedStudents.map(
                    (student) => (
                      <ListItem key={student.user.id}>
                        <ListItemText
                          primary={`${student.user.firstName} ${student.user.lastName}`}
                          secondary={student.matricNumber}
                        />
                      </ListItem>
                    )
                  )}
                </List>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => router.push("/lecturer/student-list")}
                >
                  View All Students
                </Button>
              </Paper>
            </Grid>
            {currentLecturer.lecturer.examiner && (
              <Grid item xs={12}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    Examiner Duties
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => router.push("/examiner/nominations")}
                  >
                    View Nominations
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    sx={{ ml: 2 }}
                    onClick={() => router.push("/examiner/viva-evaluations")}
                  >
                    Viva Evaluations
                  </Button>
                </Paper>
              </Grid>
            )}
          </>
        )}
      </Grid>
    </Box>
  );
}
