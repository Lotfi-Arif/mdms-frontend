import React, { useState } from "react";
import { TextField, Button, Typography, Container, Box } from "@mui/material";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";

interface AuthFormProps {
  isLogin: boolean;
}

const AuthForm: React.FC<AuthFormProps> = ({ isLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loginUser, error, isLoading } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      try {
        await loginUser({
          email,
          password,
        });
        router.push("/dashboard");
      } catch (error) {
        console.error("Error logging in", error);
      }
    } else {
      // TODO: create a toast pop-up to inform the user that sign up is not available, and to contact the admin
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          {isLoading ? "Signing In..." : isLogin ? "Sign In" : "Sign Up"}
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
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
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            {isLogin ? "Sign In" : "Sign Up"}
          </Button>
        </Box>
        {error && (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
      </Box>
    </Container>
  );
};

export default AuthForm;
