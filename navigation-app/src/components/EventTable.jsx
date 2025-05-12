import React, { useState } from "react";
import { Table, TableHead, TableBody, TableRow, TableCell, Paper, Button } from "@mui/material";
import BandDetailsModal from "./BandDetailsModal";

const EventTable = ({ events }) => {
  const [selectedBand, setSelectedBand] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleBandClick = (band) => {
    setSelectedBand(band);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedBand(null);
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          margin: "20px auto", // Center the table
          justifyContent: "center", // Center the table inside the Paper
          maxWidth: "800px", // Prevent it from stretching too wide
          borderRadius: "16px", // Rounder corners
          overflow: "hidden",
        }}
      >
        <Table sx={{}}>
          <TableHead>
            <TableRow > 
              <TableCell sx={{ fontWeight: "bold", borderRadius: "16px 0 0 0" }}>Date</TableCell>
              <TableCell sx={{ fontWeight: "bold"}}>Time</TableCell>
              <TableCell sx={{ fontWeight: "bold"}}>Performer</TableCell>
              <TableCell sx={{ fontWeight: "bold"}}>Category</TableCell>
              <TableCell sx={{ fontWeight: "bold", borderRadius: "0 16px 0 0" }}>Location</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {events.map((event, index) => (
              <TableRow key={index} > {/* Alternate row colors */}
                <TableCell>{event.date}</TableCell>
                <TableCell>{event.time}</TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleBandClick(event)}
                    sx={{
                      textTransform: "none",
                      color: "primary",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.0)" }, // Cute hover effect
                    }}
                  >
                    {event.band}
                  </Button>
                </TableCell>
                <TableCell>{event.category}</TableCell>
                <TableCell>{event.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>      
      <BandDetailsModal open={modalOpen} handleClose={handleCloseModal} band={selectedBand} />
    </>
  );
};

export default EventTable;
