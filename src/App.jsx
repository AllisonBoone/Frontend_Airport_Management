import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

// Importing individual page components
import FlightList from './pages/FlightList';
import AddFlight from './pages/AddFlight';
import AddAircraft from './pages/AddAircraft';
import AddCity from './pages/AddCity';
import AddPassenger from './pages/AddPassenger';

// Main App component
export default function App() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Airport Management System</h1>

      {/* Navigation Links */}
      <nav className="flex gap-4 mb-6">
        <Link to="/flights">Flights</Link>
        <Link to="/add-flight">Add Flight</Link>
        <Link to="/add-aircraft">Add Aircraft</Link>
        <Link to="/add-city">Add City</Link>
        <Link to="/add-passenger">Add Passenger</Link>
      </nav>

      {/* Routes */}
      <Routes>
        <Route path="/flights" element={<FlightList />} />
        <Route path="/add-flight" element={<AddFlight />} />
        <Route path="/add-aircraft" element={<AddAircraft />} />
        <Route path="/add-city" element={<AddCity />} />
        <Route path="/add-passenger" element={<AddPassenger />} />
      </Routes>
    </div>
  );
}
