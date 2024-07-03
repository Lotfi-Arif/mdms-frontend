// { id: 1, name: "Dr. John Smith", email: "john.smith@university.edu", department: "Computer Science", numberOfStudents: 120 },
//   { id: 2, name: "Prof. Jane Doe", email: "jane.doe@university.edu", department: "Physics", numberOfStudents: 80 },
//   { id: 3, name: "Dr. Robert Johnson", email: "robert.johnson@university.edu", department: "Mathematics", numberOfStudents: 95 },
//   { id: 4, name: "Prof. Emily Brown", email: "emily.brown@university.edu", department: "Chemistry", numberOfStudents: 110 }

import React, { useState, useEffect } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper, 
  Typography,
  TextField,
  Box
} from '@mui/material';

interface Lecturer {
  id: number;
  name: string;
  email: string;
  department: string;
  numberOfStudents: number;
}

// Sample data (as before)
const lecturers: Lecturer[] = [
{ id: 1, name: "Dr. John Smith", email: "john.smith@university.edu", department: "Computer Science", numberOfStudents: 120 },
{ id: 2, name: "Prof. Jane Doe", email: "jane.doe@university.edu", department: "Physics", numberOfStudents: 80 },
{ id: 3, name: "Dr. Robert Johnson", email: "robert.johnson@university.edu", department: "Mathematics", numberOfStudents: 95 },
{ id: 4, name: "Prof. Emily Brown", email: "emily.brown@university.edu", department: "Chemistry", numberOfStudents: 110 }
];

export default function LecturerList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredLecturers, setFilteredLecturers] = useState<Lecturer[]>(lecturers);

  useEffect(() => {
    const results = lecturers.filter(lecturer =>
      lecturer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecturer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecturer.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
      lecturer.numberOfStudents.toString().includes(searchTerm)
    );
    setFilteredLecturers(results);
  }, [searchTerm]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box sx={{ p: 2, bgcolor: '#f5f5f5' , boxShadow:1 }}>
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Lecturer List
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Search lecturers"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="lecturer table">
          <TableHead>
            <TableRow>
              <TableCell><b>Name</b></TableCell>
              <TableCell><b>Email</b></TableCell>
              <TableCell><b>Department</b></TableCell>
              <TableCell align="right">Number of Students</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredLecturers.map((lecturer) => (
              <TableRow
                key={lecturer.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {lecturer.name}
                </TableCell>
                <TableCell>{lecturer.email}</TableCell>
                <TableCell>{lecturer.department}</TableCell>
                <TableCell align="right">{lecturer.numberOfStudents}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </Box>
  );
}