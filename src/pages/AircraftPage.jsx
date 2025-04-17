import React from 'react';
import { useNavigate } from 'react-router-dom';

const AircraftPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Aircraft List</h2>
      <button onClick={() => navigate('/add-aircraft')}>Add Aircraft</button>
    </div>
  );
};

export default AircraftPage;
