import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  TextField,
  Button,
  Select,
  MenuItem,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Chip,
  Grid,
  Container,
  Divider,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  Delete as DeleteIcon,
  Add as AddIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
  ClearAll as ClearAllIcon
} from "@mui/icons-material";
import logo from "../image/logo.png";
import nav_styles from "../style/Navbar.module.css";
import Navbar from "../components/Navbar";

const IssueBoard = () => {
  const [issues, setIssues] = useState([]);
  const [newIssue, setNewIssue] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [description, setDescription] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [filter, setFilter] = useState("All");
  const [openClearDialog, setOpenClearDialog] = useState(false); // New state for clear confirmation dialog
  const [deletedIssues, setDeletedIssues] = useState([]);


  // Get posted by username from local storage
  const username = localStorage.getItem("username") || "Anonymous";

  const priorityIcons = {
    Low: <InfoIcon color="info" />,
    Medium: <WarningIcon color="warning" />,
    High: <ErrorIcon color="error" />
  };

  const priorityColors = {
    Low: "info",
    Medium: "warning",
    High: "error"
  };

  useEffect(() => {
    // Optionally, set up username if not already in local storage
    if (!localStorage.getItem("username")) {
      localStorage.setItem("username", "Anonymous");
    }
  }, []);

  useEffect(() => {
    const handleUndo = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "z") {
        e.preventDefault();
        if (deletedIssues.length > 0) {
          const lastDeleted = deletedIssues[deletedIssues.length - 1];
          setIssues((prev) => [...prev, lastDeleted]);
          setDeletedIssues((prev) => prev.slice(0, -1)); // Remove the restored one
        }
      }
    };

    window.addEventListener("keydown", handleUndo);
    return () => window.removeEventListener("keydown", handleUndo);
  }, [deletedIssues]);

  const addIssue = () => {
    if (newIssue.trim() === "") return;
    const issue = {
      id: Date.now(),
      title: newIssue,
      description,
      priority,
      postedBy: username,
      resolved: false,
      date: new Date().toLocaleString()
    };
    setIssues([...issues, issue]);
    setNewIssue("");
    setDescription("");
    setOpenDialog(false);
  };

  const resolveIssue = (id) => {
    setIssues(
      issues.map((issue) =>
        issue.id === id ? { ...issue, resolved: true } : issue
      )
    );
  };

  const reopenIssue = (id) => {
    setIssues(
      issues.map((issue) =>
        issue.id === id ? { ...issue, resolved: false } : issue
      )
    );
  };

  const deleteIssue = (id) => {
    const issueToDelete = issues.find((issue) => issue.id === id);
    if (issueToDelete) {
      setDeletedIssues((prev) => [...prev, issueToDelete]);
      setIssues((prev) => prev.filter((issue) => issue.id !== id));
    }
  };

  const clearIssues = () => {
    setIssues([]);
    setOpenClearDialog(false); // Close the confirmation dialog
  };

  const filteredIssues = issues.filter((issue) => {
    if (filter === "All") return true;
    if (filter === "Resolved") return issue.resolved;
    return issue.priority === filter;
  });

  return (
    <div className="issue-board-container">
      <header className="header-container">
        <div className="header-logo">
          <a href="/">
            <img src={logo} alt="Taste of Calgary Logo" />
          </a>
        </div>
        <div className="header-title">Issue Board</div>
      </header>
      <div className={nav_styles.navbar_container}>
        <Navbar />
      </div>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Paper sx={{ p: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2
                }}
              >
                <Typography variant="h5">Issue Tracking</Typography>
                <Box>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenDialog(true)}
                    sx={{ mr: 2,
                    backgroundColor: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.dark', // or use a theme color like 'primary.dark'
                    },}}
                  >
                    New Issue
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    startIcon={<ClearAllIcon />}
                    onClick={() => setOpenClearDialog(true)} // Open confirmation dialog
                    disabled={issues.length === 0}
                  >
                    Clear All
                  </Button>
                </Box>
              </Box>

              <Box sx={{ mb: 2 }}>
                <FormControl variant="outlined" size="small" sx={{ mr: 2 }}>
                  <InputLabel>Filter</InputLabel>
                  <Select
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    label="Filter"
                  >
                    <MenuItem value="All">All Issues</MenuItem>
                    <MenuItem value="Resolved">Resolved Issues</MenuItem>
                    <MenuItem value="High">High Priority</MenuItem>
                    <MenuItem value="Medium">Medium Priority</MenuItem>
                    <MenuItem value="Low">Low Priority</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              <List>
                {filteredIssues.length === 0 ? (
                  <Typography variant="body1" sx={{ p: 2 }}>
                    No issues found. Create a new issue to get started.
                  </Typography>
                ) : (
                  filteredIssues.map((issue) => (
                    <React.Fragment key={issue.id}>
                      <ListItem
                        sx={{
                          backgroundColor: issue.resolved
                            ? "action.selected"
                            : "background.paper",
                          opacity: issue.resolved ? 0.8 : 1
                        }}
                      >
                        <ListItemText
                          primary={
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2 // Adds spacing between icon and text
                              }}
                            >
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1
                                }}
                              >
                                <Chip
                                  label={issue.priority}
                                  color={priorityColors[issue.priority]}
                                  size="small"
                                />
                                <Typography
                                  variant="body1"
                                  sx={{
                                    textDecoration: issue.resolved
                                      ? "line-through"
                                      : "none",
                                    color: "black"
                                  }}
                                >
                                  {issue.title}
                                </Typography>
                              </Box>
                            </Box>
                          }
                          secondary={
                            <>
                              <Typography variant="body2">{issue.description}</Typography>
                              <Typography variant="caption">Created: {issue.date}</Typography>
                              <Typography variant="caption" sx={{ display: "block" }}>
                                Posted by: {issue.postedBy}
                              </Typography>
                            </>
                          }
                        />
                        <ListItemSecondaryAction>
                          {issue.resolved ? (
                            <>
                              <IconButton
                                edge="end"
                                aria-label="reopen"
                                onClick={() => reopenIssue(issue.id)}
                                color="primary"
                              >
                                <CancelIcon />
                                <Typography variant="body2">Reopen</Typography>
                              </IconButton>
                              <IconButton
                                edge="end"
                                aria-label="delete"
                                onClick={() => deleteIssue(issue.id)}
                                color="error"
                              >
                                <DeleteIcon />
                                <Typography variant="body2">Delete</Typography>
                              </IconButton>
                            </>
                          ) : (
                            <IconButton
                              edge="end"
                              aria-label="resolve"
                              onClick={() => resolveIssue(issue.id)}
                              color="success"
                            >
                              <CheckCircleIcon />
                              <Typography variant="body2">Resolve</Typography>
                            </IconButton>
                          )}
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))
                )}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>

      {/* Confirmation Dialog for clearing all issues */}
      <Dialog open={openClearDialog} onClose={() => setOpenClearDialog(false)}>
        <DialogTitle>Clear All Issues</DialogTitle>
        <DialogContent>
          <Typography variant="body1">Are you sure you want to clear all issues? This action cannot be undone.</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenClearDialog(false)}>Cancel</Button>
          <Button
            onClick={clearIssues}
            variant="contained"
            color="error"
          >
            Clear All
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Create New Issue</DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12}>
              <TextField
                autoFocus
                margin="dense"
                label="Issue Title"
                fullWidth
                variant="outlined"
                value={newIssue}
                onChange={(e) => setNewIssue(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                margin="dense"
                label="Description"
                fullWidth
                variant="outlined"
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth>
                <InputLabel>Priority</InputLabel>
                <Select
                  value={priority}
                  label="Priority"
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <MenuItem value="Low">Low</MenuItem>
                  <MenuItem value="Medium">Medium</MenuItem>
                  <MenuItem value="High">High</MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button
            onClick={addIssue}
            variant="contained"
            disabled={!newIssue.trim()}
          >
            Create Issue
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default IssueBoard;

