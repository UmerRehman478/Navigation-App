import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Navigation.css";
import "../style/default.css";
import logo from "../image/logo.png";
import SearchFilter from "../components/SearchFilter";
import Mapbox from "../components/Mapbox";
import nav_styles from "../style/Navbar.module.css";
import Navbar from "../components/Navbar";

const DEFAULT_LOCATION = { lat: 51.0447, lng: -114.0719 };
const API_KEY = "5b3ce3597851110001cf6248c289ef39547b4f2a93b97d9f2dd3790f";

const restaurants = [
  { name: "Burger Haven", lat: 51.0447, lng: -114.0719, genre: "Burgers" },
  { name: "Korean Grill House", lat: 51.0469, lng: -114.0722, genre: "Korean" },
  { name: "Sushi Delight", lat: 51.0429, lng: -114.075, genre: "Japanese" },
  { name: "Mexican Cantina", lat: 51.043, lng: -114.078, genre: "Mexican" },
  { name: "Thai Spice", lat: 51.045, lng: -114.073, genre: "Thai" },
  { name: "Curry Palace", lat: 51.047, lng: -114.074, genre: "Indian" },
  { name: "Craft Beer House", lat: 51.049, lng: -114.069, genre: "Beer" },
  { name: "Smokey BBQ Shack", lat: 51.041, lng: -114.076, genre: "BBQ" },
  { name: "Burger Joint", lat: 51.044, lng: -114.072, genre: "Burgers" },
  { name: "K-Town BBQ", lat: 51.046, lng: -114.071, genre: "Korean" },
];

const Navigation = () => {
  const navigate = useNavigate();
  const restaurant_categories = [
    "BBQ",
    "Burgers",
    "Beer",
    "Indian",
    "Japanese",
    "Korean",
    "Mexican",
    "Thai",
  ];

  const [userLocation, setUserLocation] = useState(null);
  const [directions, setDirections] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showDirections, setShowDirections] = useState(false);
  const [loadingDirections, setLoadingDirections] = useState(false); // New state to track loading

  const filteredRestaurants = restaurants.filter((restaurant) => {
    const matchesCategory =
      selectedCategories.length === 0 ||
      selectedCategories.includes(restaurant.genre);

    const matchesSearch =
      searchTerm.length === 0 ||
      restaurant.name.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        () => {
          setUserLocation(DEFAULT_LOCATION);
        }
      );
    } else {
      setUserLocation(DEFAULT_LOCATION);
    }
  }, []);

  useEffect(() => {
    if (userLocation && selectedRestaurant) {
      fetchDirections(userLocation, selectedRestaurant);
    }
  }, [userLocation, selectedRestaurant]);

  const fetchDirections = async (origin, destination) => {
    setLoadingDirections(true);

    const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${API_KEY}&start=${origin.lng},${origin.lat}&end=${destination.lng},${destination.lat}`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const steps = data.features[0].properties.segments[0].steps.map(
          (step) => step.instruction
        );
        setDirections(steps);
      } else {
        setDirections(["No directions found."]);
      }
    } catch (error) {
      console.error("Error fetching directions:", error);
      setDirections(["Error fetching directions."]);
    } finally {
      setLoadingDirections(false);
    }
  };

  return (
    <div>
      <header className="header-container">
        <div className="header-logo">
          <a href="/">
            <img src={logo} alt="Taste of Calgary Logo" />
          </a>
        </div>
        <div className="header-title">Map</div>
      </header>

      <div className={nav_styles.navbar_container}>
        <Navbar />
      </div>

      <section className="main">
        <div
          style={{
            width: "100%",
            padding: "10px 0",
            backgroundColor: "#f8f9fa",
            gap: "10px",
          }}
        >
          <SearchFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            categories={restaurant_categories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            restaurants={restaurants}
          />
        </div>

        <div className="total-container">
          <div className="map-container" style={{ width: "70%" }}>
            <Mapbox
              restaurants={filteredRestaurants}
              selectedRestaurant={selectedRestaurant}
            />
          </div>

          <div
            className="restaurant-list-container"
            style={{
              width: "30%",
              backgroundColor: "#f8f9fa",
              textAlign: "center",
              padding: "10px",
            }}
          >
            {!showDirections ? (
              <>
                <h2>Restaurants</h2>
                {filteredRestaurants.map((restaurant, index) => (
                  <p key={index}>
                    <button
                      onClick={() => {
                        setSelectedRestaurant(restaurant);
                        setShowDirections(true);
                      }}
                      style={{
                        padding: "10px 15px",
                        border: "1px solid gray",
                        borderRadius: "5px",
                        cursor: "pointer",
                        backgroundColor:
                          selectedRestaurant?.name === restaurant.name
                            ? "#e63946"
                            : "white",
                        color:
                          selectedRestaurant?.name === restaurant.name
                            ? "white"
                            : "black",
                      }}
                    >
                      {restaurant.name}
                    </button>
                  </p>
                ))}
              </>
            ) : (
              selectedRestaurant && (
                <div style={{ textAlign: "left" }}>
                  <h3 style={{ textAlign: "center" }}>
                    Directions to {selectedRestaurant.name}
                  </h3>
                  {loadingDirections ? (  
                    <p>Loading directions...</p>
                  ) : (
                    directions.length > 0 ? (
                      <ul style={{ paddingLeft: "20px" }}>
                        {directions.map((step, index) => (
                          <li 
                            key={index} 
                            style={{
                              marginBottom: "8px",
                              fontWeight: index === 0 ? "bold" : "normal",
                              color: index === 0 ? "#e63946" : "black",
                            }}
                          >
                            {index === 0 ? `Current Direction: ${step}` : step}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p>Fetching directions... (first time load might take a second)</p>
                    )
                  )}
                  <div style={{ textAlign: "center", marginTop: "20px" }}>
                    <button
                      onClick={() => setShowDirections(false)}
                      style={{
                        padding: "10px 15px",
                        border: "1px solid gray",
                        borderRadius: "5px",
                        cursor: "pointer",
                        backgroundColor: "#457b9d",
                        color: "white",
                      }}
                    >
                      Back to Restaurants
                    </button>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Navigation;