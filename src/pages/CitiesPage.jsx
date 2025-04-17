import React from 'react';
import { useNavigate } from 'react-router-dom';

const CityPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>City List</h2>
      <button onClick={() => navigate('/add-city')}>Add City</button>
    </div>
  );
};

export default CityPage;
