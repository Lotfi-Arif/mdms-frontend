// src/app/components/AuthForm.tsx
"use client";

import React, { useState } from "react";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
} from "@mui/material";
import { styled } from "@mui/system";
import { LoginCredentials, RegisterCredentials } from "../../types/auth";

const StyledPaper = styled(Paper)(({ theme }) => ({
  marginTop: theme.spacing(8),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  padding: theme.spacing(4),
  background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
}));

const StyledForm = styled("form")(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(1),
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(3, 0, 2),
  background: "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
  border: 0,
  borderRadius: 3,
  boxShadow: "0 3px 5px 2px rgba(33, 203, 243, .3)",
  color: "white",
  height: 48,
  padding: "0 30px",
}));

interface AuthFormProps {
  isLogin: boolean;
  onSubmit: (credentials: LoginCredentials | RegisterCredentials) => void;
  switchAuthMode: () => void;
}

const AuthForm: React.FC<AuthFormProps> = ({
  isLogin,
  onSubmit,
  switchAuthMode,
}) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [role, setRole] = useState<"student" | "lecturer">("student");
  const [universityId, setUniversityId] = useState<string>("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      onSubmit({ email, password } as LoginCredentials);
    } else {
      onSubmit({
        email,
        password,
        name,
        role,
        universityId,
      } as RegisterCredentials);
    }
  };

  return (
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
              <Box mt={2}>
                <Typography variant="body2">Role:</Typography>
                <Button
                  variant={role === "student" ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => setRole("student")}
                  style={{ marginRight: 8 }}
                >
                  Student
                </Button>
                <Button
                  variant={role === "lecturer" ? "contained" : "outlined"}
                  color="primary"
                  onClick={() => setRole("lecturer")}
                >
                  Lecturer
                </Button>
              </Box>
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
          <Button fullWidth onClick={switchAuthMode} color="primary">
            {isLogin
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </Button>
        </StyledForm>
      </StyledPaper>
    </Container>
  );
};

export default AuthForm;
