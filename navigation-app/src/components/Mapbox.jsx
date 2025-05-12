import React from "react";
import "mapbox-gl/dist/mapbox-gl.css";
import Map, { Marker, Popup } from "react-map-gl/mapbox";

const Mapbox = ({ restaurants, selectedRestaurant, onSelectRestaurant }) => {
  return (
    <Map
      mapboxAccessToken="pk.eyJ1IjoiY2FkYW1vcGkiLCJhIjoiY204MTVkc3QxMTNwNzJscTcwenZlNmNycyJ9.tL2EIyccJUf9a25QIU--aQ"
      initialViewState={{
        latitude: selectedRestaurant ? selectedRestaurant.lat : 51.0503,
        longitude: selectedRestaurant ? selectedRestaurant.lng : -114.0823,
        zoom: 14,
      }}
      style={{
        boxSizing: "border-box",
        width: "98vw",
        height: "70vh",
        borderRadius: "10px",
        marginBottom: "20px",
      }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    >
      {restaurants.map((restaurant, index) => (
        <Marker
          key={index}
          latitude={restaurant.lat}
          longitude={restaurant.lng}
          anchor="bottom"
        >
          <div
            onClick={() => onSelectRestaurant(restaurant)}
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              cursor: "pointer",
            }}
          >

            <div
              style={{
                backgroundColor:
                  selectedRestaurant?.name === restaurant.name ? "#007bff" : "red",
                width: "14px",
                height: "14px",
                borderRadius: "50%",
                border: "2px solid white",
              }}
            />

            <div
              style={{
                marginTop: "4px",
                backgroundColor: "white",
                padding: "2px 6px",
                borderRadius: "4px",
                fontSize: "12px",
                whiteSpace: "nowrap",
                color: "#333",
                boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
              }}
            >
              {restaurant.name}
            </div>
          </div>
        </Marker>
      ))}

      {selectedRestaurant && (
        <Popup
          latitude={selectedRestaurant.lat}
          longitude={selectedRestaurant.lng}
          closeButton={false}
          anchor="top"
        >
          <div style={{ color: "black", fontWeight: "bold" }}>
            {selectedRestaurant.name}
          </div>
        </Popup>
      )}
    </Map>
  );
};

export default Mapbox;