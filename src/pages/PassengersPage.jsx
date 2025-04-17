import React from 'react';
import { useNavigate } from 'react-router-dom';

const PassengerPage = () => {
  const navigate = useNavigate();

  return (
    <div className="container">
      <h2>Passenger List</h2>
      <button onClick={() => navigate('/add-passenger')}>Add Passenger</button>
    </div>
  );
};

export default PassengerPage;
