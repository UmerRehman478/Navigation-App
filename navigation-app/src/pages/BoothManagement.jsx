import React, { useState } from "react";
import logo from "../image/logo.png";
import nav_styles from "../style/Navbar.module.css";
import Navbar from "../components/Navbar";
import { Typography, Box } from "@mui/material";

const BoothManagement = () => {
  const [booths, setBooths] = useState([
    { id: 1, name: "Blowers and Grafton Booth", status: "Available" },
    { id: 2, name: "Kokoms Booth", status: "Available" },
    { id: 3, name: "Flavours Restaurant Booth", status: "Available" },
    { id: 4, name: "Amihan Grill + Bakeshop Booth", status: "Available" },
    { id: 5, name: "Padmanadi Vegan Eatery Booth", status: "Available" },
    { id: 6, name: "Minas Brazilian Steakhouse Booth", status: "Available" },
    { id: 7, name: "Moxies Booth", status: "Available" },
    { id: 8, name: "Caribbean Taste Booth", status: "Available" },
    { id: 9, name: "Fresh Prep Booth", status: "Available" },
    { id: 10, name: "BBQ Chicken Booth", status: "Available" },
    { id: 11, name: "Forty Creek Booth", status: "Available" },
  ]);

  const toggleBoothStatus = (id) => {
    setBooths(
      booths.map((booth) =>
        booth.id === id
          ? {
              ...booth,
              status: booth.status === "Available" ? "Occupied" : "Available",
            }
          : booth
      )
    );
  };

  return (
    <div style={{ backgroundColor: "#ffd6d6", minHeight: "100vh" }}>
      {/* HEADER */}
      <header className="header-container">
        <div className="header-logo">
          <a href="/">
            <img src={logo} alt="Taste of Calgary Logo" />
          </a>
        </div>
        <div className="header-title">Booth Management</div>
      </header>
      <div className={nav_styles.navbar_container}>
        <Navbar />
      </div>

      {/* BOOTH LIST */}
      <ul style={{ listStyleType: "none", padding: "20px" }}>
        {booths.map((booth) => (
          <li
            key={booth.id}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#ffcaca",
              borderRadius: "8px",
              padding: "10px 20px",
              marginBottom: "10px",
              fontWeight: "bold",
              fontSize: "18px",
              color: booth.status === "Available" ? "green" : "red",
            }}
          >
            <span>
              {booth.name} - {booth.status}
            </span>
            <button
              onClick={() => toggleBoothStatus(booth.id)}
              style={{
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "6px",
                padding: "8px 12px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Toggle Status
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BoothManagement;
