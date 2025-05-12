import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSignup = () => {
    if (username.trim() && email.trim()) {
      localStorage.setItem("username", username);
      navigate("/");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#ffe6e6", // same as login background
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          width: "350px",
          p: 3,
          bgcolor: "white",
          borderRadius: 3,
          boxShadow: 3,
          textAlign: "center",
        }}
      >
        <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold", color: "#d32f2f" }}>
          Sign Up
        </Typography>

        <TextField
          fullWidth
          label="Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />

        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 3 }}
        />

        <Button
          variant="contained"
          fullWidth
          onClick={handleSignup}
          sx={{
            backgroundColor: "#ff5722",
            fontWeight: "bold",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#e64a19",
            },
          }}
        >
          Create Account
        </Button>

        <Typography sx={{ mt: 2 }} variant="body2">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#007bff", fontWeight: "bold", textDecoration: "none", cursor: "pointer" }}
          >
            Login
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default Signup;

