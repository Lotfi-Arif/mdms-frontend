import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Grid,
  LinearProgress,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

interface Student {
  id: string;
  name: string;
  matricNumber: string;
  projectTitle: string;
  progress: number;
  status: "On Track" | "At Risk" | "Behind";
}

interface Submission {
  id: string;
  title: string;
  submissionDate: string;
  fileUrl: string;
}

interface StudentDetails extends Student {
  submissions: Submission[];
}

// Mock data
const students: Student[] = [
  {
    id: "1",
    name: "John Doe",
    matricNumber: "A12345",
    projectTitle: "AI in Healthcare",
    progress: 75,
    status: "On Track",
  },
  {
    id: "2",
    name: "Jane Smith",
    matricNumber: "A12346",
    projectTitle: "Blockchain for Supply Chain",
    progress: 45,
    status: "At Risk",
  },
  {
    id: "3",
    name: "Bob Johnson",
    matricNumber: "A12347",
    projectTitle: "Machine Learning in Finance",
    progress: 90,
    status: "On Track",
  },
  // Add more students as needed
];

const studentDetails: Record<string, StudentDetails> = {
  "1": {
    ...students[0],
    submissions: [
      {
        id: "1",
        title: "Project Proposal",
        submissionDate: "2024-02-15",
        fileUrl: "/files/proposal.pdf",
      },
      {
        id: "2",
        title: "Progress Report 1",
        submissionDate: "2024-04-01",
        fileUrl: "/files/progress1.pdf",
      },
    ],
  },
  "2": {
    ...students[1],
    submissions: [
      {
        id: "1",
        title: "Project Proposal",
        submissionDate: "2024-02-16",
        fileUrl: "/files/proposal2.pdf",
      },
    ],
  },
  "3": {
    ...students[2],
    submissions: [
      {
        id: "1",
        title: "Project Proposal",
        submissionDate: "2024-02-14",
        fileUrl: "/files/proposal3.pdf",
      },
      {
        id: "2",
        title: "Progress Report 1",
        submissionDate: "2024-03-30",
        fileUrl: "/files/progress3_1.pdf",
      },
      {
        id: "3",
        title: "Progress Report 2",
        submissionDate: "2024-05-15",
        fileUrl: "/files/progress3_2.pdf",
      },
    ],
  },
};

const StudentProgress: React.FC = () => {
  const [selectedStudent, setSelectedStudent] = useState<StudentDetails | null>(
    null
  );
  const [openDialog, setOpenDialog] = useState(false);

  const handleStudentClick = (studentId: string) => {
    setSelectedStudent(studentDetails[studentId]);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const getStatusColor = (status: Student["status"]) => {
    switch (status) {
      case "On Track":
        return "success";
      case "At Risk":
        return "warning";
      case "Behind":
        return "error";
      default:
        return "default";
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Student Progress
      </Typography>
      <Paper elevation={3}>
        <List>
          {students.map((student) => (
            <ListItem
              key={student.id}
              button
              onClick={() => handleStudentClick(student.id)}
              divider
            >
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={student.name}
                secondary={
                  <React.Fragment>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {student.projectTitle}
                    </Typography>
                    {` — ${student.matricNumber}`}
                  </React.Fragment>
                }
              />
              <Box sx={{ minWidth: 150 }}>
                <LinearProgress
                  variant="determinate"
                  value={student.progress}
                  sx={{ mb: 1 }}
                />
                <Typography variant="body2" color="text.secondary">
                  Progress: {student.progress}%
                </Typography>
              </Box>
              <Chip
                label={student.status}
                color={getStatusColor(student.status)}
                sx={{ ml: 2 }}
              />
            </ListItem>
          ))}
        </List>
      </Paper>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedStudent && (
          <>
            <DialogTitle>{selectedStudent.name}&apos;s Progress</DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Matric Number:</Typography>
                  <Typography variant="body1">
                    {selectedStudent.matricNumber}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle1">Project Title:</Typography>
                  <Typography variant="body1">
                    {selectedStudent.projectTitle}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Progress:</Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box sx={{ width: "100%", mr: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={selectedStudent.progress}
                      />
                    </Box>
                    <Box sx={{ minWidth: 35 }}>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                      >{`${selectedStudent.progress}%`}</Typography>
                    </Box>
                  </Box>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle1">Status:</Typography>
                  <Chip
                    label={selectedStudent.status}
                    color={getStatusColor(selectedStudent.status)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                    Submissions
                  </Typography>
                  <TableContainer component={Paper}>
                    <Table>
                      <TableHead>
                        <TableRow>
                          <TableCell>Title</TableCell>
                          <TableCell>Submission Date</TableCell>
                          <TableCell>Action</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {selectedStudent.submissions.map((submission) => (
                          <TableRow key={submission.id}>
                            <TableCell>{submission.title}</TableCell>
                            <TableCell>
                              {new Date(
                                submission.submissionDate
                              ).toLocaleDateString()}
                            </TableCell>
                            <TableCell>
                              <Button
                                variant="contained"
                                startIcon={<FileDownloadIcon />}
                                size="small"
                                href={submission.fileUrl}
                                target="_blank"
                              >
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default StudentProgress;
