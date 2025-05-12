import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Events from "./pages/Events.jsx";
import BoothManagement from "./pages/BoothManagement.jsx";
import IssueBoard from "./pages/IssueBoard.jsx";
import Navigation from "./pages/Navigation.jsx";
import EventOverview from "./pages/EventOverview.jsx";
import Home from "./pages/Home.jsx"; 
import Notifications from "./pages/Notifications.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./components/Signup.jsx"

const App = () => {
  return (
    <Router>
      {/* ✅ Navbar is placed outside Routes so it's visible on every page -
        Luke: I'm temporarily removing this cause it's easier but this way is
        definitely better in the future as opposed to having navbar repeatedly
        on every page*/}
      {/*<Navbar />*/}

      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/events" element={<Events />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/navigation" element={<Navigation />} />
        <Route path="/event-overview" element={<EventOverview />} /> 
        {/*Jordan: The tragic death of the directions page*/}
        <Route path="/booth-management" element={<BoothManagement />} />
        <Route path="/issue-board" element={<IssueBoard />} />
        <Route path="/login" element={<Login />} /> 
        <Route path="/signup" element={<Signup />} /> 
      </Routes>
    </Router>
  );
};

export default App;
