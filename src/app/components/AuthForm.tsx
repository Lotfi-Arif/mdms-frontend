// src/components/AuthForm.tsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  ThemeProvider,
  createTheme,
  CssBaseline,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { styled } from "@mui/system";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#dc004e",
    },
  },
});

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
  backgroundColor: "#f5f5f5",
}));

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
}));

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (credentials: any) => void;
  switchAuthMode: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isLogin,
  onSubmit,
  switchAuthMode,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState<"student" | "lecturer">("student");
  const [universityId, setUniversityId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onSubmit({ email, password });
    } else {
      onSubmit({ email, password, name, role, universityId });
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <StyledPaper elevation={6}>
          <Typography component="h1" variant="h5">
            {isLogin ? "Sign in" : "Sign up"}
          </Typography>
          <StyledForm onSubmit={handleSubmit}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {!isLogin && (
              <>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Full Name"
                  name="name"
                  autoComplete="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <FormControl fullWidth variant="outlined" margin="normal">
                  <InputLabel id="role-label">Role</InputLabel>
                  <Select
                    labelId="role-label"
                    id="role"
                    value={role}
                    onChange={(e) =>
                      setRole(e.target.value as "student" | "lecturer")
                    }
                    label="Role"
                  >
                    <MenuItem value="student">Student</MenuItem>
                    <MenuItem value="lecturer">Lecturer</MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="universityId"
                  label={role === "student" ? "Matric Number" : "Staff Number"}
                  name="universityId"
                  value={universityId}
                  onChange={(e) => setUniversityId(e.target.value)}
                />
              </>
            )}
            <StyledButton
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
            >
              {isLogin ? "Sign In" : "Sign Up"}
            </StyledButton>
            <Button fullWidth onClick={switchAuthMode} color="secondary">
              {isLogin
                ? "Don't have an account? Sign Up"
                : "Already have an account? Sign In"}
            </Button>
          </StyledForm>
        </StyledPaper>
      </Container>
    </ThemeProvider>
  );
};

export default AuthForm;
