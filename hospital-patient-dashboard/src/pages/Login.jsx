import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Alert,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // Simple demo login credentials
  const DEMO_USERNAME = "admin";
  const DEMO_PASSWORD = "admin123";

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (username === DEMO_USERNAME && password === DEMO_PASSWORD) {
      localStorage.setItem("hospitalLoggedIn", "true");
      localStorage.setItem("hospitalUsername", username);
      navigate("/", { replace: true });
    } else {
      setError("Invalid username or password.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #e3f2fd 0%, #f5f7fa 100%)",
        p: 2,
      }}
    >
      <Container maxWidth="sm">
        <Paper elevation={5} sx={{ p: { xs: 3, sm: 5 }, borderRadius: 3 }}>
          <Box sx={{ textAlign: "center", mb: 3 }}>
            <LocalHospitalIcon color="primary" sx={{ fontSize: 50 }} />
            <Typography variant="h4" fontWeight="bold" sx={{ mt: 1 }}>
              Hospital Login
            </Typography>
            <Typography color="text.secondary">
              Sign in to Patient Management System
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              required
              label="Username"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              margin="normal"
              autoComplete="username"
              autoFocus
            />

            <TextField
              fullWidth
              required
              type="password"
              label="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              margin="normal"
              autoComplete="current-password"
            />

            <Button
              fullWidth
              type="submit"
              variant="contained"
              size="large"
              sx={{ mt: 3, py: 1.4 }}
            >
              Login
            </Button>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 3, textAlign: "center" }}
          >
            Demo: admin / admin123
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Login;
