import React from 'react';
import { useNavigate } from 'react-router-dom';

const AirportPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Airport List</h2>
      <button onClick={() => navigate('/add-airport')}>Add Airport</button>
    </div>
  );
};

export default AirportPage;
