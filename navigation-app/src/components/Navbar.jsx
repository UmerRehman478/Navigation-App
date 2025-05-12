import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import nav_styles from "../style/Navbar.module.css";

const Navbar = () => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    }
  }, []);

  return (
    <div className={nav_styles.navbar}>
      <ul className={nav_styles.nav_links}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/navigation">Map</Link></li>
        <li><Link to="/events">Events</Link></li>
        <li><Link to="/notifications">Notifications</Link></li>

        {username === "admin" && (
          <>
            <li><Link to="/booth-management">Booth Management</Link></li>
            <li><Link to="/issue-board">Issue Board</Link></li>
          </>
        )}

        <li><Link to="/login">Login</Link></li>
      </ul>
    </div>
  );
};

export default Navbar;

