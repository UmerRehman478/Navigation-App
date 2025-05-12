import React, { useState } from "react";
import "../style/default.css";
import "../style/EventsPage.css";
import nav_styles from "../style/Navbar.module.css";
import logo from "../image/logo.png";
import SearchFilter from "../components/SearchFilter";
import CategoryFilter from "../components/CategoryFilter";
import EventTable from "../components/EventTable";
import Navbar from "../components/Navbar";

const categories = [
  "All",
  "Rock",
  "Alternative",
  "Classical",
  "Jazz",
  "Funk",
  "Electronic",
  "Indie",
  "Comedy",
];
const events = [
  {
    date: "March 15, 2025",
    time: "7:00 PM",
    band: "King Gizzard & The Lizard Wizard",
    location: "The Electric Hall",
    category: "Rock",
    image:
      "https://images.squarespace-cdn.com/content/v1/63e2f155c13d5f1f1b668207/6755e05e-114e-4014-8292-8e4d9dc24545/king++for+InSpiteMagazine-3.jpg",
    description:
      "A high-energy rock band known for their electrifying performances.",
  },
  {
    date: "March 16, 2025",
    time: "8:30 PM",
    band: "Goofy Clown (Comedy Special)",
    location: "Laugh Factory Downtown",
    category: "Comedy",
  },
  {
    date: "March 18, 2025",
    time: "6:45 PM",
    band: "The Velvet Echoes",
    location: "Sunset Amphitheater",
    category: "Alternative",
  },
  {
    date: "March 20, 2025",
    time: "9:00 PM",
    band: "Luna & The Synthwave Dreams",
    location: "Neon Pulse Club",
    category: "Electronic",
  },
  {
    date: "March 21, 2025",
    time: "7:30 PM",
    band: "The Chuckle Bros (Comedy Night)",
    location: "Uptown Comedy Lounge",
    category: "Comedy",
  },
  {
    date: "March 23, 2025",
    time: "10:00 PM",
    band: "The Cosmic Jesters",
    location: "Galaxy Soundstage",
    category: "Funk",
  },
  {
    date: "March 25, 2025",
    time: "6:00 PM",
    band: "Deadpan Dan (Stand-Up Special)",
    location: "Brickhouse Comedy Club",
    category: "Comedy",
  },
  {
    date: "March 27, 2025",
    time: "8:15 PM",
    band: "Funky Monks",
    location: "Riverfront Park",
    category: "Funk",
  },
  {
    date: "March 29, 2025",
    time: "7:45 PM",
    band: "The Jazz Nomads",
    location: "Blue Note Café",
    category: "Jazz",
  },
];

const Events = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);

  const filteredEvents = events.filter(
    (event) =>
      (selectedCategories.length === 0 ||
        selectedCategories.includes(event.category)) &&
      event.band.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="events-container">
      <header className="header-container">
        <div className="header-logo">
          <a href="/">
            <img src={logo} alt="Taste of Calgary Logo" />
          </a>
        </div>
        <div className="header-title">Events</div>
      </header>
      <div className={nav_styles.navbar_container}>
        <Navbar />
      </div>
      <SearchFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
      />

      <EventTable events={filteredEvents} />
    </div>
  );
};

export default Events;
