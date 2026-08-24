import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import DashboardScreen from './screens/DashboardScreen';
import AddBetScreen from './screens/AddBetScreen';
import BetHistoryScreen from './screens/BetHistoryScreen';
import StatisticsScreen from './screens/StatisticsScreen';
import SettingsScreen from './screens/SettingsScreen';
import './App.css';

function NavBar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className={`nav-item ${isActive('/') ? 'active' : ''}`}>
        <span>🏠</span>
        <span>Home</span>
      </Link>
      <Link to="/add-bet" className={`nav-item ${isActive('/add-bet') ? 'active' : ''}`}>
        <span>➕</span>
        <span>Add</span>
      </Link>
      <Link to="/history" className={`nav-item ${isActive('/history') ? 'active' : ''}`}>
        <span>📜</span>
        <span>History</span>
      </Link>
      <Link to="/stats" className={`nav-item ${isActive('/stats') ? 'active' : ''}`}>
        <span>📊</span>
        <span>Stats</span>
      </Link>
      <Link to="/settings" className={`nav-item ${isActive('/settings') ? 'active' : ''}`}>
        <span>⚙️</span>
        <span>Settings</span>
      </Link>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <div className="app-container">
        <header className="app-header">
          <h1>Betpawa Tracker</h1>
          <p>Virtual Games Betting</p>
        </header>
        <main className="app-main">
          <Routes>
            <Route path="/" element={<DashboardScreen />} />
            <Route path="/add-bet" element={<AddBetScreen />} />
            <Route path="/history" element={<BetHistoryScreen />} />
            <Route path="/stats" element={<StatisticsScreen />} />
            <Route path="/settings" element={<SettingsScreen />} />
          </Routes>
        </main>
        <NavBar />
      </div>
    </Router>
  );
}

export default App;
