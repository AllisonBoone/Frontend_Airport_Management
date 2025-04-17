import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import FlightsPage from './pages/FlightsPage';
import AircraftPage from './pages/AircraftPage';
import CitiesPage from './pages/CitiesPage';
import AirportsPage from './pages/AirportsPage';
import PassengersPage from './pages/PassengersPage';
import './App.css';

export default function App() {
  return (
    <div className="container">
      <h1>Airport Management System</h1>
      <nav>
        <ul>
          <li>
            <Link to="/flights">Flights</Link>
          </li>
          <li>
            <Link to="/aircraft">Aircraft</Link>
          </li>
          <li>
            <Link to="/cities">Cities</Link>
          </li>
          <li>
            <Link to="/airports">Airports</Link>
          </li>
          <li>
            <Link to="/passengers">Passengers</Link>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="/aircraft" element={<AircraftPage />} />
        <Route path="/cities" element={<CitiesPage />} />
        <Route path="/airports" element={<AirportsPage />} />
        <Route path="/passengers" element={<PassengersPage />} />
      </Routes>
    </div>
  );
}
