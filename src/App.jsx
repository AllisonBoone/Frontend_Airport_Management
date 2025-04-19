import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';

import AircraftPage from './pages/AircraftPage.jsx';
import AirportsPage from './pages/AirportsPage.jsx';
import CitiesPage from './pages/CitiesPage.jsx';
import FlightsPage from './pages/FlightsPage.jsx';
import PassengersPage from './pages/PassengersPage.jsx';

export default function App() {
  return (
    <>
      <nav>
        <ul className="nav-list">
          <li>
            <NavLink to="/aircraft">Aircraft</NavLink>
          </li>
          <li>
            <NavLink to="/airports">Airports</NavLink>
          </li>
          <li>
            <NavLink to="/cities">Cities</NavLink>
          </li>
          <li>
            <NavLink to="/flights">Flights</NavLink>
          </li>
          <li>
            <NavLink to="/passengers">Passengers</NavLink>
          </li>
        </ul>
      </nav>

      <Routes>
        <Route path="/aircraft" element={<AircraftPage />} />
        <Route path="/airports" element={<AirportsPage />} />
        <Route path="/cities" element={<CitiesPage />} />
        <Route path="/flights" element={<FlightsPage />} />
        <Route path="/passengers" element={<PassengersPage />} />
      </Routes>
    </>
  );
}
