import React, { useState } from "react";
import "../style/Notification.css";
import {
  FaSearch,
  FaTrash,
  FaInfoCircle,
  FaWhatsapp,
  FaInstagram,
  FaSnapchatGhost,
  FaFacebookF,
  FaInbox,
  FaShareAlt,
  FaClock,
  FaLeaf,
  FaSeedling,
  FaUtensils,
  FaCog,
  FaMapMarkerAlt,
} from "react-icons/fa";
import nav_styles from "../style/Navbar.module.css";
import Navbar from "../components/Navbar";
import logo from "../image/logo.png";
import foodImage from "../image/Food.jpg";
import musicImage from "../image/stock-band.jpg";
import comedyImage from "../image/ComedyNight.jpg";
import closedImage from "../image/Closed.png";

const Notifications = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [dismissedIds, setDismissedIds] = useState([]);
  const [readIds, setReadIds] = useState([]);
  const [selectedNotification, setSelectedNotification] = useState(null);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [undoStack, setUndoStack] = useState([]);

  const originalNotifications = [
    { id: "🚨1", icon: "🚨", text: "EVENT CANCELLED: 🎭 The Chuckle Bros – Aug 12", type: "cancelled", pinned: true, time: "Apr 3, 3:00 PM", location: "Uptown Comedy Lounge" },
    { id: "🚨2", icon: "🚨", text: "EVENT CANCELLED: 🎤 Deadpan Dan – Aug 13", type: "cancelled", pinned: true, time: "Apr 3, 2:45 PM", location: "Brickhouse Comedy Club" },
    { id: "🚨3", icon: "🚨", text: "EVENT CANCELLED: 🎸 The Jazz Nomads – Aug 14", type: "cancelled", pinned: true, time: "Apr 3, 2:30 PM", location: "Blue Note Café" },
    { id: "🎸4", icon: "🎸", text: "King Gizzard hitting the stage in 30 minutes", time: "Apr 3, 2:00 PM", location: "Riverfront Park" },
    { id: "🍕5", icon: "🍕", text: "Grafton is almost out of their famous donair pizza!", time: "Apr 3, 1:00 PM", type: "food", dietary: ["halal"], waitTime: 5, location: "Grafton Stall" },
    { id: "🤡6", icon: "🤡", text: "Goofy Clown is now performing on Stage 1", time: "Apr 3, 12:45 PM", location: "Laugh Factory Downtown" },
    { id: "🚧7", icon: "🚧", text: "Section B is closed off temporarily", time: "Apr 3, 12:15 PM", type: "closed", location: "Festival Grounds – Section B" },
    { id: "🎵8", icon: "🎵", text: "2PM Guitar Show", time: "Apr 3, 2:00 PM", location: "Sunset Amphitheater" },
    { id: "🍦9", icon: "🍦", text: "Sweet Scoop giving out free ice cream!", time: "Apr 3, 3:20 PM", type: "food", dietary: ["gluten-free"], waitTime: 10, location: "Sweet Scoop Booth" },
    { id: "🎤10", icon: "🎤", text: "Open mic night starts in 1 hour!", time: "Apr 3, 3:25 PM", location: "Community Stage" },
    { id: "🎭11", icon: "🎭", text: "New comedy act just announced for Friday", time: "Apr 3, 3:30 PM", location: "Stand-Up Circle" },
    { id: "🍹12", icon: "🍹", text: "Tiki Bar Happy Hour extended to 7 PM", time: "Apr 3, 3:35 PM", type: "food", dietary: ["vegan"], waitTime: 15, location: "Tiki Bar Patio" },
    { id: "🍔14", icon: "🍔", text: "Burger Bus", time: "Apr 3, 3:45 PM", type: "food", dietary: ["gluten-free", "halal"], waitTime: 7, location: "North Lot" },
    { id: "🥗15", icon: "🥗", text: "Green Garden", time: "Apr 3, 3:52 PM", type: "food", dietary: ["vegan", "gluten-free"], waitTime: 8, location: "Veg Lane" },
    { id: "🍲16", icon: "🍲", text: "Curry Hut", time: "Apr 3, 3:56 PM", type: "food", dietary: ["halal"], waitTime: 12, location: "Spice Row" },
    { id: "🥤17", icon: "🥤", text: "Smoothie Shack", time: "Apr 3, 3:58 PM", type: "food", dietary: ["vegan"], waitTime: 28, location: "Fruit lane" }
  ];

  const [notifications, setNotifications] = useState(originalNotifications);

  const handleDismiss = (id) => {
    const dismissedNotif = notifications.find(n => n.id === id);
    if (dismissedNotif) setUndoStack(prev => [dismissedNotif, ...prev]);
    setDismissedIds((prev) => [...prev, id]);
    setSelectedNotification(null);
  };

  const handleUndo = () => {
    if (undoStack.length > 0) {
      const [lastDismissed, ...rest] = undoStack;
      setDismissedIds((prev) => prev.filter(id => id !== lastDismissed.id));
      setUndoStack(rest);
    }
    setMenuOpen(false);
  };

  const handleNotificationClick = (notif) => {
    setReadIds((prev) => [...new Set([...prev, notif.id])]);
    setSelectedNotification(notif);
    setShowShareOptions(false);
    setMenuOpen(false);
  };

  const handleReadAll = () => {
    const allIds = notifications.map(n => n.id);
    setReadIds(allIds);
    setMenuOpen(false);
  };

  const handleRemoveAll = () => {
    setDismissedIds(notifications.map(n => n.id));
    setMenuOpen(false);
  };

  const handleReset = () => {
    setDismissedIds([]);
    setReadIds([]);
    setSelectedNotification(null);
    setMenuOpen(false);
  };

  const filteredNotifications = notifications
    .filter((notif) => !dismissedIds.includes(notif.id))
    .filter((notif) => notif.text.toLowerCase().includes(searchTerm.toLowerCase()));

  const renderDietaryIcons = (tags = []) => (
    <div className="dietary-tags">
      {tags.includes("vegan") && <span className="dietary vegan"><FaLeaf /> Vegan</span>}
      {tags.includes("gluten-free") && <span className="dietary gluten"><FaSeedling /> Gluten-Free</span>}
      {tags.includes("halal") && <span className="dietary halal"><FaUtensils /> Halal</span>}
    </div>
  );

  const getNotificationImage = (notif) => {
    const text = notif.text.toLowerCase();
    if (notif.type === "closed") return closedImage;
    if (notif.type === "food" || text.includes("pizza") || text.includes("ice cream") || text.includes("burger") || text.includes("smoothie")) {
      return foodImage;
    }
    if (text.includes("gizzard") || text.includes("guitar") || text.includes("concert")) {
      return musicImage;
    }
    return comedyImage;
  };

  return (
    <div>
      <header className="header-container">
        <div className="header-logo">
          <a href="/"><img src={logo} alt="Taste of Calgary Logo" /></a>
        </div>
        <div className="header-title">Notifications</div>
      </header>

      <div className={nav_styles.navbar_container}>
        <Navbar />
      </div>

      <div className="notification-container">
        <div className="search-bar">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {!selectedNotification && (
          <div className="floating-menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
            <FaCog />
            {menuOpen && (
              <div className="options-dropdown-card top-right">
                <button onClick={handleReadAll}>✅ Mark All as Read</button>
                <button onClick={handleRemoveAll}>🗑️ Remove All Notifications</button>
                <button onClick={handleReset}>♻️ Reset Notifications</button>
                <button onClick={handleUndo}>↩️ Undo Last Action</button>
              </div>
            )}
          </div>
        )}

        <div className="notification-list">
          {filteredNotifications.map((notif) => (
            <div
              key={notif.id}
              className={`notification-item ${notif.type === "cancelled" ? "cancelled" : ""} ${readIds.includes(notif.id) ? "read" : ""}`}
              onClick={() => handleNotificationClick(notif)}
            >
              <span className="icon">{notif.icon}</span>
              <span className="notification-text">{notif.text}</span>
              <div className="notif-actions">
                <span
                  className="dismiss-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDismiss(notif.id);
                  }}
                >✕</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedNotification && (
        <div className="modal-backdrop" onClick={() => setSelectedNotification(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-content">
              <h3><FaInfoCircle /> Notification Details</h3>
              <img src={getNotificationImage(selectedNotification)} alt="Event" className="notification-image" />
              <p><strong>{selectedNotification.icon}</strong> {selectedNotification.text}</p>
              <p className="time-detail"><FaInbox /> {selectedNotification.time}</p>

              {selectedNotification.location && (
                <p className="location-detail"><FaMapMarkerAlt /> Location: {selectedNotification.location}</p>
              )}

              {selectedNotification.waitTime !== undefined && (
                <div className="wait-time-bar">
                  <p><FaClock /> Estimated wait: {selectedNotification.waitTime} minutes</p>
                  <div className="progress-wrapper">
                    <div
                      className="progress-bar"
                      style={{
                        width: `${Math.min((selectedNotification.waitTime / 30) * 100, 100)}%`,
                        backgroundColor:
                          selectedNotification.waitTime <= 10 ? '#4caf50' :
                          selectedNotification.waitTime <= 20 ? '#ffc107' : '#f44336'
                      }}
                    ></div>
                  </div>
                </div>
              )}

              {selectedNotification.dietary && renderDietaryIcons(selectedNotification.dietary)}

              <div className="modal-actions">
                <button className="btn-dark" onClick={() => setShowShareOptions(!showShareOptions)}><FaShareAlt /> Share</button>
                <button className="btn-dark" onClick={() => handleDismiss(selectedNotification.id)}><FaTrash /> Delete</button>
                <button className="btn-dark" onClick={() => setSelectedNotification(null)}>Close</button>
              </div>

              {showShareOptions && (
                <div className="share-icons">
                  <FaWhatsapp className="share-icon whatsapp" title="WhatsApp" />
                  <FaInstagram className="share-icon instagram" title="Instagram" />
                  <FaSnapchatGhost className="share-icon snapchat" title="Snapchat" />
                  <FaFacebookF className="share-icon facebook" title="Facebook" />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
