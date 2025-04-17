import React from 'react';
import { useNavigate } from 'react-router-dom';

const FlightsPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Flight List</h2>
      <button onClick={() => navigate('/add-flight')}>Add Flight</button>
    </div>
  );
};

export default FlightsPage;
