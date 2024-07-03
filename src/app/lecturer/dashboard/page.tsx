import React from "react";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  Divider,
  Chip,
  Button,
} from "@mui/material";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import AssignmentIcon from "@mui/icons-material/Assignment";
import EventIcon from "@mui/icons-material/Event";
import PersonIcon from "@mui/icons-material/Person";

interface Student {
  id: string;
  name: string;
  progress: number;
}

interface UpcomingViva {
  id: string;
  studentName: string;
  date: string;
}

interface RecentSubmission {
  id: string;
  studentName: string;
  submissionType: string;
  date: string;
}

// Mock data
const supervisedStudents: Student[] = [
  { id: "1", name: "John Doe", progress: 75 },
  { id: "2", name: "Jane Smith", progress: 60 },
  { id: "3", name: "Bob Johnson", progress: 40 },
];

const upcomingVivas: UpcomingViva[] = [
  { id: "1", studentName: "Alice Brown", date: "2024-07-15" },
  { id: "2", studentName: "Charlie Davis", date: "2024-07-18" },
];

const recentSubmissions: RecentSubmission[] = [
  {
    id: "1",
    studentName: "John Doe",
    submissionType: "Progress Report 1",
    date: "2024-06-30",
  },
  {
    id: "2",
    studentName: "Jane Smith",
    submissionType: "Final Thesis",
    date: "2024-07-02",
  },
];

export default function LecturerDashboardPage() {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Lecturer Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* Supervised Students */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <SupervisorAccountIcon
                  sx={{ mr: 1, verticalAlign: "middle" }}
                />
                Supervised Students
              </Typography>
              <List>
                {supervisedStudents.map((student) => (
                  <React.Fragment key={student.id}>
                    <ListItem>
                      <ListItemText
                        primary={student.name}
                        secondary={`Progress: ${student.progress}%`}
                      />
                      <Chip
                        label={`${student.progress}%`}
                        color={student.progress > 50 ? "success" : "warning"}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                View All Students
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Upcoming Vivas */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <EventIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Upcoming Vivas
              </Typography>
              <List>
                {upcomingVivas.map((viva) => (
                  <React.Fragment key={viva.id}>
                    <ListItem>
                      <ListItemText
                        primary={viva.studentName}
                        secondary={`Date: ${new Date(
                          viva.date
                        ).toLocaleDateString()}`}
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                View All Vivas
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Submissions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                <AssignmentIcon sx={{ mr: 1, verticalAlign: "middle" }} />
                Recent Submissions
              </Typography>
              <List>
                {recentSubmissions.map((submission) => (
                  <React.Fragment key={submission.id}>
                    <ListItem>
                      <ListItemText
                        primary={submission.studentName}
                        secondary={`${submission.submissionType} - ${new Date(
                          submission.date
                        ).toLocaleDateString()}`}
                      />
                      <Button variant="contained" size="small">
                        Review
                      </Button>
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
              <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
                View All Submissions
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<SupervisorAccountIcon />}
                  >
                    Assign Supervisor
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<EventIcon />}
                  >
                    Schedule Viva
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<AssignmentIcon />}
                  >
                    Review Submission
                  </Button>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Button
                    variant="contained"
                    fullWidth
                    startIcon={<PersonIcon />}
                  >
                    Update Profile
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}
