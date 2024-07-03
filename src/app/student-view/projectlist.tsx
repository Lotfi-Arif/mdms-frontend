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

interface Project {
  id: number;
  title: string;
  type: string;
  fieldOfArea: string;
}

// Sample data (as before)
const projects: Project[] = [
    { id: 1, title: "AI-Powered Traffic Management System", type: "Research", fieldOfArea: "Artificial Intelligence" },
    { id: 2, title: "Sustainable Urban Planning Model", type: "Development", fieldOfArea: "Environmental Science" },
    { id: 3, title: "Quantum Cryptography Implementation", type: "Research", fieldOfArea: "Quantum Computing" },
    { id: 4, title: "Blockchain-based Supply Chain Tracking", type: "Application", fieldOfArea: "Blockchain Technology" },
    { id: 5, title: "Biodegradable Plastics from Algae", type: "Research", fieldOfArea: "Biotechnology" },
];

export default function ProjectList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(projects);

  useEffect(() => {
    const results = projects.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.fieldOfArea.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProjects(results);
  }, [searchTerm]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  return (
    <Box sx={{ p: 2, bgcolor: '#f5f5f5' , boxShadow:1 }}>
    <div style={{ padding: '20px' }}>
      <Typography variant="h4" gutterBottom>
        Project List
      </Typography>
      <Box sx={{ mb: 2 }}>
        <TextField
          fullWidth
          label="Search projects"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
        />
      </Box>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="project table">
          <TableHead>
            <TableRow>
              <TableCell><b>Project Title</b></TableCell>
              <TableCell><b>Project Type</b></TableCell>
              <TableCell><b>Field of Area</b></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProjects.map((project) => (
              <TableRow
                key={project.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {project.title}
                </TableCell>
                <TableCell>{project.type}</TableCell>
                <TableCell>{project.fieldOfArea}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
    </Box>
  );
}