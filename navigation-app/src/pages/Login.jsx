import React, { useState } from "react";
import {
  Box,
  Button,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = () => {
    if (username.trim()) {
      localStorage.setItem("username", username);
      navigate("/"); // ⬅️ Redirect to homepage after login
    }
  };

  const handleNotImplemented = () => {
    alert("This feature is not implemented for our prototype. Any username and password will work! However, use the 'admin' username to see the pages made for event organisers.");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#ffe6e6",
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
          Login
        </Typography>

        {/* Username/Email Field */}
        <TextField
          fullWidth
          label="Email or Username"
          variant="outlined"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Password Field */}
        <TextField
          fullWidth
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />

        {/* Forgot Password */}
        <Box sx={{ textAlign: "right", mb: 2 }}>
          <span
            onClick={handleNotImplemented}
            style={{ color: "#007bff", fontWeight: "bold", textDecoration: "none", cursor: "pointer" }}
          >
            Forgot Password?
          </span>
        </Box>

        {/* Login Button */}
        <Button
          variant="contained"
          fullWidth
          onClick={handleLogin}
          sx={{
            backgroundColor: "#ff5722",
            fontWeight: "bold",
            color: "#ffffff",
            "&:hover": {
              backgroundColor: "#e64a19",
            },
          }}
        >
          Login
        </Button>

        {/* Divider */}
        <Typography sx={{ my: 2, color: "#888" }}>OR</Typography>

        {/* Signup */}
        <Typography variant="body2">
          Don’t have an account?{" "}
          <span
            onClick={() => navigate("/signup")}
            style={{ color: "#007bff", fontWeight: "bold", textDecoration: "none", cursor: "pointer" }}
          >
            Sign Up
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default Login;

