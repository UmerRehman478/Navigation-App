import React, { useState, useRef, useEffect } from "react";
import {
  TextField,
  IconButton,
  Menu,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Button,
  Box,
  List,
  ListItem,
  Popper,
  Paper,
  ClickAwayListener,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import styles from "../style/SearchFilter.module.css";

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
  setSearchQuery,
  categories,
  selectedCategories,
  setSelectedCategories,
  restaurants,
  setFilteredRestaurants,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [tempSelectedCategories, setTempSelectedCategories] =
    useState(selectedCategories);
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const searchBarRef = useRef(null);

  // Open filter menu
  const handleFilterClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // Reset filters
  const handleResetFilter = () => {
    setSelectedCategories([]);
    setTempSelectedCategories([]);
    setFilteredRestaurants(restaurants); // Show all restaurants again
    setAnchorEl(null);
  };

  // Apply selected filters
  const handleApplyAndClose = () => {
    setSelectedCategories(tempSelectedCategories);
    setAnchorEl(null);
  };

  // Toggle category selection
  const handleCategoryChange = (category) => {
    setTempSelectedCategories((prevCategories) =>
      prevCategories.includes(category)
        ? prevCategories.filter((item) => item !== category)
        : [...prevCategories, category]
    );
  };

  // Handle search input changes
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchTerm(query);

    if (query.length > 0) {
      const filtered = restaurants.filter((restaurant) =>
        restaurant.name.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setDropdownOpen(true);
    } else {
      setFilteredSuggestions([]);
      setDropdownOpen(false);
      resetSearchAndFilters(); // Reset everything when cleared
    }
  };

  // Handle selection from dropdown
  const handleSelectSuggestion = (name) => {
    setSearchTerm(name);
    setFilteredSuggestions([]);
    setDropdownOpen(false);
  };

  // Reset everything when the input is cleared
  const resetSearchAndFilters = () => {
    setSearchQuery(""); // Clear search query
    setFilteredRestaurants(restaurants); // Show all restaurants
    setSelectedCategories([]); // Reset filters
  };

  // Apply search when clicking search button
  const handleSearch = () => {
    setSearchQuery(searchTerm);
    setDropdownOpen(false);
  };

  // Close dropdown when clicking away
  const handleClickAway = () => {
    setDropdownOpen(false);
  };

  return (
    <React.Fragment>
      <div className={styles.searchBarContainer} ref={searchBarRef}>
        <TextField
          className={styles.searchBar}
          variant="outlined"
          placeholder="Search..."
          value={searchTerm}
          onChange={handleSearchChange}
          slotProps={{
            input: {
              sx: {
                borderRadius: 20,
                backgroundColor: "white",
                boxShadow: "0px 5px 10px rgba(0, 0, 0, 0.3)",
              },
              startAdornment: (
                <IconButton aria-label="search" onClick={handleSearch}>
                  <SearchIcon />
                </IconButton>
              ),
              endAdornment: (
                <IconButton aria-label="filter" onClick={handleFilterClick}>
                  <FilterListIcon />
                </IconButton>
              ),
            },
          }}
        />
      </div>

      {/* Popper dropdown for search suggestions */}
      <Popper
        open={dropdownOpen}
        anchorEl={searchBarRef.current}
        placement="bottom"
        style={{ zIndex: 999, width: "65%" }}
      >
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper className={styles.suggestionsDropdown} elevation={3}>
            <List>
              {filteredSuggestions.map((restaurant) => (
                <ListItem
                  key={restaurant.name}
                  button
                  onClick={() => handleSelectSuggestion(restaurant.name)}
                >
                  {restaurant.name}
                </ListItem>
              ))}
            </List>
          </Paper>
        </ClickAwayListener>
      </Popper>

      {/* Filter dropdown menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleApplyAndClose}
      >
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            onClick={handleApplyAndClose}
            sx={{ minWidth: "150px" }}
          >
            Apply & Close
          </Button>
        </Box>
        <Box display="flex" justifyContent="center">
          <Button
            variant="contained"
            onClick={handleResetFilter}
            sx={{
              minWidth: "150px",
              marginBottom: "20px",
              backgroundColor: "red",
            }}
          >
            RESET FILTERS
          </Button>
        </Box>
        {categories.map((category) => (
          <MenuItem
            key={category}
            onClick={() => handleCategoryChange(category)}
            sx={{ width: "200px", height: "75px" }}
          >
            <FormControlLabel
              control={
                <Checkbox checked={tempSelectedCategories.includes(category)} />
              }
              label={category}
              sx={{ color: "black" }}
            />
          </MenuItem>
        ))}
      </Menu>
    </React.Fragment>
  );
};

export default SearchFilter;
