import React from "react";
import { Container, Typography, Button, Grid, Card, CardContent, Box, CardActionArea } from "@mui/material";
import { Link } from "react-router-dom";
import { Map, Event, Update } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import logo from "../image/logo.png";
import foodImage from "../image/toc-image.png";
import nav_styles from "../style/Navbar.module.css";

const Home = () => {

  const handleNotImplemented = () => {
    alert("This feature is not implemented");
  };
  return (
    <div>
      {/* Navigation Bar */}
      <nav className={nav_styles.navbar_container}>
        <div className={nav_styles.nav_left}>
          <a href="/">
            <img src={logo} alt="Taste of Calgary Logo" />
          </a>
        </div>
        <div>
          <Navbar />
        </div>
      </nav>

      {/* Hero Section with Overlay Text and White Box */}
      <Box sx={{ position: 'relative', width: '100%', my: 4 }}>
        <img 
          src={foodImage} 
          alt="Delicious food" 
          style={{ 
            width: "100%", 
            height: "400px", 
            objectFit: "cover" 
          }} 
        />
        <Box sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          p: 2
        }}>
          <Box sx={{
            backgroundColor: 'rgba(255, 255, 255, 0.9)', // White with 90% opacity
            p: 4,
            borderRadius: 2,
            maxWidth: '800px',
            boxShadow: 3
          }}>
            <Typography variant="h2" gutterBottom sx={{ 
              fontWeight: 'bold',
              color: 'bold'
            }}>
              Welcome to Taste of Calgary
            </Typography>
            <Typography variant="h5" sx={{
              color: 'text.secondary',
              mt: 2
            }}>
              Discover amazing food, drinks, and live entertainment at Calgary's biggest food festival!
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Feature Sections */}
      <Container maxWidth="lg" sx={{ my: 4 }}>
        <Grid container spacing={4}>
          {[
            { title: "Explore Map", icon: <Map fontSize="large" />, description: "Find your next food adventure", link: "/navigation" },
            { title: "Explore Events", icon: <Event fontSize="large" />, description: "See what performances are happening", link: "/events" },
            { title: "Check Updates", icon: <Update fontSize="large" />, description: "Check latest event updates", link: "/notifications" },
          ].map((section, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card sx={{ textAlign: "center", padding: 3 }}>
                <CardActionArea component={Link} to={section.link}>
                  {section.icon}
                  <CardContent>
                    <Typography variant="h5">{section.title}</Typography>
                    <Typography variant="body2" color="textSecondary">{section.description}</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer */}
      <Box component="footer" sx={{ width: "100%", bgcolor: "#000000", py: 3, textAlign: "center" }}>
        <Container maxWidth="lg">
          <Typography variant="h6" sx={{ color: 'white' }}>Sign up for our Newsletter</Typography>
          <div className="signup-form">
            <input type="text" placeholder="First name" />
            <input type="text" placeholder="Last name" />
            <input type="email" placeholder="Email address" />
            <Button variant="contained" onClick={handleNotImplemented} sx={{ backgroundColor: '#e63946', '&:hover': { backgroundColor: 'darkred' } }}> 
              Sign Up 
            </Button>
          </div>
          <Typography variant="body2" color="#ffffff" sx={{ mt: 2 }}>
            © 2025 Taste of Calgary, 3613 Blackburn Road SE, Calgary, AB T2G 4A3
          </Typography>
          <Typography variant="body2" color="#ffffff">Phone: 403-453-7424</Typography>
        </Container>
      </Box>
    </div>
  );
};

export default Home;
