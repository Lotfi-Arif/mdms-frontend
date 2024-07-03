import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  IconButton,
  Menu,
  MenuItem,
  InputAdornment,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import SortIcon from "@mui/icons-material/Sort";

interface Student {
  id: string;
  name: string;
  email: string;
  matricNumber: string;
  projectTitle: string;
  progress: number;
  status: "On Track" | "At Risk" | "Behind";
}

// Mock data
const students: Student[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    matricNumber: "A12345",
    projectTitle: "Machine Learning in Healthcare",
    progress: 75,
    status: "On Track",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    matricNumber: "A12346",
    projectTitle: "Blockchain for Supply Chain",
    progress: 45,
    status: "At Risk",
  },
  {
    id: "3",
    name: "Bob Johnson",
    email: "bob.johnson@example.com",
    matricNumber: "A12347",
    projectTitle: "AI in Education",
    progress: 90,
    status: "On Track",
  },
  {
    id: "4",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    matricNumber: "A12348",
    projectTitle: "Cybersecurity in IoT Devices",
    progress: 30,
    status: "Behind",
  },
  // Add more students as needed
];

export default function StudentListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<keyof Student>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleStatusFilterChange = (event: SelectChangeEvent) => {
    setStatusFilter(event.target.value);
  };

  const handleSortChange = (column: keyof Student) => {
    if (sortBy === column) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortDirection("asc");
    }
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    studentId: string
  ) => {
    setAnchorEl(event.currentTarget);
    setSelectedStudent(studentId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedStudent(null);
  };

  const filteredStudents = students
    .filter(
      (student) =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.matricNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.projectTitle.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((student) =>
      statusFilter ? student.status === statusFilter : true
    )
    .sort((a, b) => {
      if (a[sortBy] < b[sortBy]) return sortDirection === "asc" ? -1 : 1;
      if (a[sortBy] > b[sortBy]) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Student List
      </Typography>

      <Box sx={{ display: "flex", mb: 2 }}>
        <TextField
          variant="outlined"
          placeholder="Search students..."
          value={searchTerm}
          onChange={handleSearchChange}
          sx={{ mr: 2, flexGrow: 1 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <FormControl sx={{ minWidth: 120, mr: 2 }}>
          <InputLabel id="status-filter-label">Status</InputLabel>
          <Select
            labelId="status-filter-label"
            value={statusFilter}
            onChange={handleStatusFilterChange}
            label="Status"
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="On Track">On Track</MenuItem>
            <MenuItem value="At Risk">At Risk</MenuItem>
            <MenuItem value="Behind">Behind</MenuItem>
          </Select>
        </FormControl>
        <Button variant="outlined" startIcon={<FilterListIcon />}>
          More Filters
        </Button>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <Button
                  onClick={() => handleSortChange("name")}
                  startIcon={<SortIcon />}
                >
                  Name
                </Button>
              </TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Matric Number</TableCell>
              <TableCell>
                <Button
                  onClick={() => handleSortChange("projectTitle")}
                  startIcon={<SortIcon />}
                >
                  Project Title
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleSortChange("progress")}
                  startIcon={<SortIcon />}
                >
                  Progress
                </Button>
              </TableCell>
              <TableCell>
                <Button
                  onClick={() => handleSortChange("status")}
                  startIcon={<SortIcon />}
                >
                  Status
                </Button>
              </TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredStudents.map((student) => (
              <TableRow key={student.id}>
                <TableCell>{student.name}</TableCell>
                <TableCell>{student.email}</TableCell>
                <TableCell>{student.matricNumber}</TableCell>
                <TableCell>{student.projectTitle}</TableCell>
                <TableCell>{student.progress}%</TableCell>
                <TableCell>
                  <Chip
                    label={student.status}
                    color={
                      student.status === "On Track"
                        ? "success"
                        : student.status === "At Risk"
                        ? "warning"
                        : "error"
                    }
                  />
                </TableCell>
                <TableCell>
                  <IconButton
                    onClick={(event) => handleMenuOpen(event, student.id)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>View Details</MenuItem>
        <MenuItem onClick={handleMenuClose}>Send Message</MenuItem>
        <MenuItem onClick={handleMenuClose}>Schedule Meeting</MenuItem>
      </Menu>
    </Box>
  );
}
