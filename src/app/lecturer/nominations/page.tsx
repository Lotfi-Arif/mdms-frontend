import React, { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
} from "@mui/material";

interface Lecturer {
  id: string;
  name: string;
  email: string;
  department: string;
  expertise: string[];
}

interface Nomination {
  id: string;
  nomineeName: string;
  vivaTitle: string;
  studentName: string;
  date: string;
  status: "Pending" | "Accepted" | "Rejected";
}

// Mock data
const lecturers: Lecturer[] = [
  {
    id: "1",
    name: "Dr. Jane Smith",
    email: "jane.smith@university.edu",
    department: "Computer Science",
    expertise: ["Machine Learning", "Data Science"],
  },
  {
    id: "2",
    name: "Prof. John Doe",
    email: "john.doe@university.edu",
    department: "Electrical Engineering",
    expertise: ["Robotics", "Control Systems"],
  },
  {
    id: "3",
    name: "Dr. Alice Johnson",
    email: "alice.johnson@university.edu",
    department: "Information Systems",
    expertise: ["Database Systems", "Big Data"],
  },
  // Add more lecturers as needed
];

const myNominations: Nomination[] = [
  {
    id: "1",
    nomineeName: "Dr. Jane Smith",
    vivaTitle: "AI in Healthcare",
    studentName: "Bob Brown",
    date: "2024-07-15",
    status: "Pending",
  },
  {
    id: "2",
    nomineeName: "Prof. John Doe",
    vivaTitle: "Blockchain for Supply Chain",
    studentName: "Alice Green",
    date: "2024-07-20",
    status: "Accepted",
  },
  // Add more nominations as needed
];

export default function ExaminerNominations() {
  const [openNominateDialog, setOpenNominateDialog] = useState(false);
  const [selectedLecturer, setSelectedLecturer] = useState<Lecturer | null>(
    null
  );
  const [vivaDetails, setVivaDetails] = useState({
    title: "",
    studentName: "",
    date: "",
  });

  const handleNominate = (lecturer: Lecturer) => {
    setSelectedLecturer(lecturer);
    setOpenNominateDialog(true);
  };

  const handleCloseNominateDialog = () => {
    setOpenNominateDialog(false);
    setSelectedLecturer(null);
    setVivaDetails({ title: "", studentName: "", date: "" });
  };

  const handleSubmitNomination = () => {
    // Here you would typically send the nomination data to your backend
    console.log("Nominating", selectedLecturer, "for viva:", vivaDetails);
    handleCloseNominateDialog();
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Examiner Nominations
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Nominate a Lecturer as Examiner
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Department</TableCell>
                    <TableCell>Expertise</TableCell>
                    <TableCell>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {lecturers.map((lecturer) => (
                    <TableRow key={lecturer.id}>
                      <TableCell>{lecturer.name}</TableCell>
                      <TableCell>{lecturer.email}</TableCell>
                      <TableCell>{lecturer.department}</TableCell>
                      <TableCell>
                        {lecturer.expertise.map((exp, index) => (
                          <Chip
                            key={index}
                            label={exp}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="contained"
                          onClick={() => handleNominate(lecturer)}
                        >
                          Nominate
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              My Nominations
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nominee</TableCell>
                    <TableCell>Viva Title</TableCell>
                    <TableCell>Student</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {myNominations.map((nomination) => (
                    <TableRow key={nomination.id}>
                      <TableCell>{nomination.nomineeName}</TableCell>
                      <TableCell>{nomination.vivaTitle}</TableCell>
                      <TableCell>{nomination.studentName}</TableCell>
                      <TableCell>
                        {new Date(nomination.date).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={nomination.status}
                          color={
                            nomination.status === "Accepted"
                              ? "success"
                              : nomination.status === "Rejected"
                              ? "error"
                              : "default"
                          }
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>

      <Dialog open={openNominateDialog} onClose={handleCloseNominateDialog}>
        <DialogTitle>Nominate {selectedLecturer?.name} as Examiner</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Viva Title"
            type="text"
            fullWidth
            value={vivaDetails.title}
            onChange={(e) =>
              setVivaDetails({ ...vivaDetails, title: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Student Name"
            type="text"
            fullWidth
            value={vivaDetails.studentName}
            onChange={(e) =>
              setVivaDetails({ ...vivaDetails, studentName: e.target.value })
            }
          />
          <TextField
            margin="dense"
            label="Viva Date"
            type="date"
            fullWidth
            InputLabelProps={{
              shrink: true,
            }}
            value={vivaDetails.date}
            onChange={(e) =>
              setVivaDetails({ ...vivaDetails, date: e.target.value })
            }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseNominateDialog}>Cancel</Button>
          <Button onClick={handleSubmitNomination} variant="contained">
            Submit Nomination
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
