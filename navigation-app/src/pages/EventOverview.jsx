import React, { useState } from "react";
import "../style/default.css";
import "../style/EventsOverview.css";
import logo from "../image/logo.png";
import nav_styles from "../style/Navbar.module.css";
import Navbar from "../components/Navbar";

const EventOverview = () => {
  const [filter, setFilter] = useState("All");

  // Sample event data
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Stage Setup",
      status: "Pending",
      vendor: "Electricity Vendor",
    },
    {
      id: 2,
      name: "Lighting Check",
      status: "In Progress",
      vendor: "Lighting Vendor",
    },
    {
      id: 3,
      name: "Booth Payments",
      status: "Completed",
      vendor: "Payment Vendor",
    },
    {
      id: 4,
      name: "Security Check",
      status: "In Progress",
      vendor: "Security Team",
    },
  ]);

  // Filter events based on status
  const filteredEvents =
    filter === "All"
      ? events
      : events.filter((event) => event.status === filter);

  return (
    <div className="event-overview">
      <header className="header-container">
        <div className="header-logo">
          <img src={logo} alt="Taste of Calgary Logo" />
        </div>
        <div className="header-title">Event Overview</div>
      </header>
      <div className={nav_styles.navbar_container}>
        <Navbar />
      </div>
      {/* Filter Buttons */}
      <div className="filter-options">
        {["All", "Pending", "In Progress", "Completed"].map((status) => (
          <button
            key={status}
            className={`filter-button ${filter === status ? "active" : ""}`}
            onClick={() => setFilter(status)}
          >
            {status}
          </button>
        ))}
      </div>

      {/* Status Tracker */}
      <div className="status-tracker">
        {filteredEvents.map((event) => (
          <div
            key={event.id}
            className={`event-card ${event.status.toLowerCase()}`}
          >
            <h3>{event.name}</h3>
            <p>
              <strong>Status:</strong> {event.status}
            </p>
            <p>
              <strong>Vendor:</strong> {event.vendor}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventOverview;
