import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Grid,
  Box,
} from '@mui/material';

interface SemesterInfo {
  session: string;
  semester: number;
  progress1Date: string;
  progress2Date: string;
  finalReportDate: string;
  presentationDate: string;
}

const semesterInfo: SemesterInfo = {
  session: "2023/2024",
  semester: 2,
  progress1Date: "2024-04-28",
  progress2Date: "2024-02-06",
  finalReportDate: "2024-04-07",
  presentationDate: "2024-07-07",
};

function calculateProgress(startDate: string, endDate: string): number {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const now = new Date().getTime();
  
  if (now < start) return 0;
  if (now > end) return 100;
  
  return Math.round(((now - start) / (end - start)) * 100);
}

export default function ProgressCard() {
  const progress = calculateProgress(semesterInfo.progress1Date, semesterInfo.presentationDate);

  return (
    <Box sx={{ p: 2, bgcolor: '#f5f5f5' , boxShadow:1 }}>
      <Card sx={{ maxWidth: 700, mx: 'auto' }}>
        <CardContent>
          <Typography variant="h5" component="div" gutterBottom align="center" sx={{ mb: 2 }}>
            My Progress
          </Typography>
          <Box sx={{ mb: 3 }}>
            <LinearProgress 
              variant="determinate" 
              value={progress} 
              sx={{ height: 12, borderRadius: 6 }}
            />
            <Typography variant="body1" color="text.secondary" align="right" sx={{ mt: 1 }}>
              {`${progress}%`}
            </Typography>
          </Box>
          <Typography variant="h6" gutterBottom sx={{ mb: 2 }}>
            Current semester info:
          </Typography>
          <Grid container spacing={2}>
            {Object.entries(semesterInfo).map(([key, value]) => (
              <React.Fragment key={key}>
                <Grid item xs={6}>
                  <Typography variant="body1" color="text.secondary">
                    {key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1').trim()}:
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body1">
                    {key.includes('Date') ? new Date(value as string).toLocaleDateString() : value}
                  </Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
}