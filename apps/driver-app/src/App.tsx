import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Home from './pages/Home';
import Earnings from './pages/Earnings';
import History from './pages/History';
import Profile from './pages/Profile';
import RideDetails from './pages/RideDetails';
import './index.css';

function App() {
  useEffect(() => {
    // Initialize app
    console.log('TUYA Driver App loaded');
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/earnings" element={<Earnings />} />
        <Route path="/history" element={<History />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/ride/:id" element={<RideDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
