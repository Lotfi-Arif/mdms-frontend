import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Divider,
  List,
  ListItem,
  ListItemText,
  Modal,
  Button
} from '@mui/material';

interface Student {
  id: number;
  name: string;
  projectTitle: string;
  projectType: string;
  fieldOfArea: string;
  supervisor: string;
  vivaDate: string;
  vivaTime: string;
  examiners: string[];
}

const students: Student[] = [
  {
    id: 1,
    name: "Jane Doe",
    projectTitle: "AI-Powered Traffic Management System",
    projectType: "Research",
    fieldOfArea: "Artificial Intelligence",
    supervisor: "Dr. John Smith",
    vivaDate: "July 15, 2024",
    vivaTime: "10:00 AM",
    examiners: ["Dr. Emily Brown", "Prof. Michael Johnson"]
  },
  // Add more students as needed
];

export default function VivaDetailsExam() {
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const handleOpenModal = (student: Student) => {
    setSelectedStudent(student);
  };

  const handleCloseModal = () => {
    setSelectedStudent(null);
  };

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f5f5', p: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Assigned Students for Viva
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {students.map((student) => (
          <Grid item xs={12} sm={6} md={4} key={student.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="h2" gutterBottom>
                  {student.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Project:</strong> {student.projectTitle}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Type:</strong> {student.projectType}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Field:</strong> {student.fieldOfArea}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Supervisor:</strong> {student.supervisor}
                </Typography>
                <Button 
                  variant="contained" 
                  color="primary" 
                  fullWidth 
                  sx={{ mt: 2 }}
                  onClick={() => handleOpenModal(student)}
                >
                  View Viva Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal
        open={!!selectedStudent}
        onClose={handleCloseModal}
        aria-labelledby="viva-details-modal"
      >
        <Box sx={{ 
          position: 'absolute', 
          top: '50%', 
          left: '50%', 
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 4,
          maxWidth: 600,
          width: '100%',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}>
          {selectedStudent && (
            <CardContent>
              <Typography variant="h4" component="h1" gutterBottom align="center">
                Viva Details
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="h6" component="h2">
                    Project Information
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Project Title:</strong>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedStudent.projectTitle}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Project Type:</strong>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedStudent.projectType}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Field of Area:</strong>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedStudent.fieldOfArea}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Viva Date:</strong>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedStudent.vivaDate}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Viva Time:</strong>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedStudent.vivaTime}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" component="h2">
                    Student Information
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Student Name:</strong>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedStudent.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body1" color="text.secondary">
                    <strong>Supervisor:</strong>
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {selectedStudent.supervisor}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="h6" component="h2" gutterBottom>
                    Panel of Examiners
                  </Typography>
                  <List dense>
                    {selectedStudent.examiners.map((examiner, index) => (
                      <ListItem key={index}>
                        <ListItemText primary={examiner} />
                      </ListItem>
                    ))}
                  </List>
                </Grid>
              </Grid>
            </CardContent>
          )}
        </Box>
      </Modal>
    </Box>
  );
}