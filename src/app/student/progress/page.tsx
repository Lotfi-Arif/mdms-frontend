"use client";

import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Grid,
  Box,
  Divider,
  Chip,
  CircularProgress,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import QueryBuilderIcon from "@mui/icons-material/QueryBuilder";
import { useStudent } from "@/hooks/useStudent";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface Milestone {
  name: string;
  date: Date | null;
  completed: boolean | null;
}

export default function MyProgressPage() {
  const { currentUser, isLoading } = useAuth();
  const router = useRouter();
  const { progress, error, fetchStudentByEmail, getProgress } = useStudent();

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    } else if (currentUser?.student?.id) {
      fetchStudentByEmail(currentUser.email);
      getProgress(currentUser.email);
    }
  }, [currentUser, fetchStudentByEmail, getProgress, router]);

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!currentUser || !currentUser?.student) {
    return (
      <Typography color="error">
        {error || "No student data available. Please log in as a student."}
      </Typography>
    );
  }

  const student = currentUser.student;

  const milestones: Milestone[] = [
    {
      name: "Progress 1",
      date: student.progress1Date,
      completed: student.progress1Completed,
    },
    {
      name: "Progress 2",
      date: student.progress2Date,
      completed: student.progress2Completed,
    },
    {
      name: "Final Report",
      date: student.finalReportDate,
      completed: student.finalReportCompleted,
    },
    {
      name: "Presentation",
      date: student.presentationDate,
      completed: student.presentationCompleted,
    },
  ];

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        My Progress
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Overall Progress
              </Typography>
              <Box sx={{ mb: 3 }}>
                <LinearProgress
                  variant="determinate"
                  value={progress}
                  sx={{ height: 12, borderRadius: 6 }}
                />
                <Typography
                  variant="body1"
                  color="text.secondary"
                  align="right"
                  sx={{ mt: 1 }}
                >
                  {`${progress}%`}
                </Typography>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
                Current Semester Info:
              </Typography>
              <Grid container spacing={2}>
                {milestones.map((milestone) => (
                  <React.Fragment key={milestone.name}>
                    <Grid item xs={6}>
                      <Typography variant="body1" color="text.secondary">
                        {milestone.name} Date:
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        {milestone.date
                          ? new Date(milestone.date).toLocaleDateString()
                          : "Not set"}
                      </Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Milestones
              </Typography>
              {milestones.map((milestone, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item>
                      {milestone.completed ? (
                        <CheckCircleOutlineIcon color="success" />
                      ) : (
                        <QueryBuilderIcon color="action" />
                      )}
                    </Grid>
                    <Grid item xs>
                      <Typography variant="body1">{milestone.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {milestone.date
                          ? new Date(milestone.date).toLocaleDateString()
                          : "Date not set"}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Chip
                        label={milestone.completed ? "Completed" : "Pending"}
                        color={milestone.completed ? "success" : "default"}
                        size="small"
                      />
                    </Grid>
                  </Grid>
                  {index < milestones.length - 1 && <Divider sx={{ my: 2 }} />}
                </Box>
              ))}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
