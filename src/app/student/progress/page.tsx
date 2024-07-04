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
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import PendingIcon from "@mui/icons-material/Pending";
import { RootState } from "../../../store";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

interface SemesterInfo {
  session: string;
  semester: number;
  progress1Date: string;
  progress2Date: string;
  finalReportDate: string;
  presentationDate: string;
}

interface Milestone {
  name: string;
  date: string;
  completed: boolean;
}

const semesterInfo: SemesterInfo = {
  session: "2023/2024",
  semester: 2,
  progress1Date: "2024-02-28",
  progress2Date: "2024-04-06",
  finalReportDate: "2024-06-07",
  presentationDate: "2024-07-07",
};

const milestones: Milestone[] = [
  { name: "Progress 1", date: semesterInfo.progress1Date, completed: true },
  { name: "Progress 2", date: semesterInfo.progress2Date, completed: false },
  {
    name: "Final Report",
    date: semesterInfo.finalReportDate,
    completed: false,
  },
  {
    name: "Presentation",
    date: semesterInfo.presentationDate,
    completed: false,
  },
];

function calculateProgress(startDate: string, endDate: string): number {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();
  if (now < start) return 0;
  if (now > end) return 100;
  return Math.round(((now - start) / (end - start)) * 100);
}

export default function ProgressPage() {
  const progress = calculateProgress(
    semesterInfo.progress1Date,
    semesterInfo.presentationDate
  );

  const { user, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated && !user?.student) {
      router.push("/login");
    }
  }, [isAuthenticated, user, router]);

  if (!isAuthenticated || !user?.student) {
    return null;
  }

  return (
    <Box sx={{ p: 3, bgcolor: "#f5f5f5", minHeight: "100vh" }}>
      <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4 }}>
        My Progress
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
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
                {Object.entries(semesterInfo).map(([key, value]) => (
                  <React.Fragment key={key}>
                    <Grid item xs={6}>
                      <Typography variant="body1" color="text.secondary">
                        {key.charAt(0).toUpperCase() +
                          key
                            .slice(1)
                            .replace(/([A-Z])/g, " $1")
                            .trim()}
                        :
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="body1">
                        {key.includes("Date")
                          ? new Date(value as string).toLocaleDateString()
                          : value}
                      </Typography>
                    </Grid>
                  </React.Fragment>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
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
                        <PendingIcon color="action" />
                      )}
                    </Grid>
                    <Grid item xs>
                      <Typography variant="body1">{milestone.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new Date(milestone.date).toLocaleDateString()}
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
