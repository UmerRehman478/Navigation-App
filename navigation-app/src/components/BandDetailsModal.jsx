import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  Box,
} from "@mui/material";
import stockBandImage from "../image/stock-band.jpg"

const BandDetailsModal = ({ open, handleClose, band }) => {
  if (!band) return null;

  const defaultImage = stockBandImage;
  const defaultDescription = "This performer is awesome and you should come see them!";

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{band.band}</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <img
            src={band.image || defaultImage}
            alt={band.band}
            style={{
              width: "100%",
              maxWidth: "300px",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          />
          <Typography variant="h6" gutterBottom>
            {band.band}
          </Typography>
          <DialogContentText>{band.description || defaultDescription}</DialogContentText>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
            <strong>Time:</strong> {band.time}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Location:</strong> {band.location}
          </Typography>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default BandDetailsModal;

