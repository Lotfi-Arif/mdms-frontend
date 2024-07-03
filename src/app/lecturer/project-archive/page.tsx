import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

interface Project {
  id: string;
  title: string;
  student: string;
  supervisor: string;
  year: number;
  tags: string[];
  abstract: string;
  grade: string;
}

// Mock data
const projects: Project[] = [
  {
    id: "1",
    title: "Machine Learning Approach to Predict Student Performance",
    student: "John Doe",
    supervisor: "Dr. Jane Smith",
    year: 2023,
    tags: ["Machine Learning", "Education", "Data Analysis"],
    abstract:
      "This project explores the use of machine learning algorithms to predict student academic performance based on various factors...",
    grade: "A",
  },
  {
    id: "2",
    title: "Blockchain-based Voting System",
    student: "Alice Johnson",
    supervisor: "Prof. Bob Williams",
    year: 2022,
    tags: ["Blockchain", "Security", "Voting Systems"],
    abstract:
      "A secure and transparent voting system implemented using blockchain technology to ensure the integrity of election processes...",
    grade: "A-",
  },
  // Add more projects as needed
];

export default function ProjectArchive() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [openDialog, setOpenDialog] = useState(false);

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.supervisor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  const handleOpenDialog = (project: Project) => {
    setSelectedProject(project);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Project Archive
      </Typography>

      <TextField
        fullWidth
        variant="outlined"
        placeholder="Search projects..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        sx={{ mb: 3 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />

      <Grid container spacing={3}>
        {filteredProjects.map((project) => (
          <Grid item xs={12} sm={6} md={4} key={project.id}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {project.title}
                </Typography>
                <Typography color="textSecondary" gutterBottom>
                  {project.student} • {project.year}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  Supervisor: {project.supervisor}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  {project.tags.map((tag, index) => (
                    <Chip
                      key={index}
                      label={tag}
                      size="small"
                      sx={{ mr: 1, mb: 1 }}
                    />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button size="small" onClick={() => handleOpenDialog(project)}>
                  View Details
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        fullWidth
      >
        {selectedProject && (
          <>
            <DialogTitle>{selectedProject.title}</DialogTitle>
            <DialogContent>
              <TableContainer component={Paper} sx={{ mb: 2 }}>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Student
                      </TableCell>
                      <TableCell>{selectedProject.student}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Supervisor
                      </TableCell>
                      <TableCell>{selectedProject.supervisor}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Year
                      </TableCell>
                      <TableCell>{selectedProject.year}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        Grade
                      </TableCell>
                      <TableCell>{selectedProject.grade}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
              <Typography variant="h6" gutterBottom>
                Abstract
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedProject.abstract}
              </Typography>
              <Typography variant="h6" gutterBottom>
                Tags
              </Typography>
              <Box>
                {selectedProject.tags.map((tag, index) => (
                  <Chip key={index} label={tag} sx={{ mr: 1, mb: 1 }} />
                ))}
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}
