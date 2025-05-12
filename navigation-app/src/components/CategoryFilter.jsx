import React from "react";
import { Chip } from "@mui/material";
import "../style/EventsPage.css"

const categories = ["All", "Rock", "Alternative", "Classical", "Jazz", "Funk", "Electronic", "Indie", "Comedy"];

const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="category-filters">
      {categories.map((category) => (
        <Chip
          key={category}
          label={category}
          onClick={() => setSelectedCategory(category)}
          variant={selectedCategory === category ? "filled" : "outlined"}
          sx={{
            margin: "4px",
            bgcolor: selectedCategory === category ? "#ff5733" : "transparent",
            color: selectedCategory === category ? "white" : "inherit",
            "&:hover": { bgcolor: selectedCategory === category ? "darkorange" : "rgba(255, 165, 0, 0.2)" },
          }}
        />
      ))}
    </div>
  );
};

export default CategoryFilter;
