import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';

interface VivaDetails {
  projectTitle: string;
  projectType: string;
  vivaDate: string;
  vivaTime: string;
  studentName: string;
  examiners: string[];
}

const vivaDetails: VivaDetails = {
  projectTitle: "AI-Powered Traffic Management System",
  projectType: "Research",
  vivaDate: "July 15, 2024",
  vivaTime: "10:00 AM",
  studentName: "Jane Doe",
  examiners: ["Dr. John Smith", "Prof. Emily Brown"]
};

export default function VivaDetails() {
  return (
  
    <Box sx={{ minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'flex-start', 
      justifyContent: 'center', 
      bgcolor: '#f5f5f5',
      pt: 4,
      boxShadow:1 }}>
      <Card sx={{ maxWidth: 600, width: '100%', m: 2 }}>
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
                {vivaDetails.projectTitle}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="text.secondary">
                <strong>Project Type:</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                {vivaDetails.projectType}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="text.secondary">
                <strong>Viva Date:</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                {vivaDetails.vivaDate}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="body1" color="text.secondary">
                <strong>Viva Time:</strong>
              </Typography>
              <Typography variant="body1" gutterBottom>
                {vivaDetails.vivaTime}
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
                {vivaDetails.studentName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
              <Typography variant="h6" component="h2" gutterBottom>
                Panel of Examiners
              </Typography>
              <List dense>
                {vivaDetails.examiners.map((examiner, index) => (
                  <ListItem key={index}>
                    <ListItemText primary={examiner} />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}