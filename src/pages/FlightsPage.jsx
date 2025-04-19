import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function FlightsPage() {
  const [flights, setFlights] = useState([]);
  const [aircraftOptions, setAircraftOptions] = useState([]);
  const [airportOptions, setAirportOptions] = useState([]);
  const [formData, setFormData] = useState({
    flightNumber: '',
    aircraftId: '',
    departureAirportId: '',
    arrivalAirportId: '',
    departureTime: '',
    arrivalTime: '',
  });
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFlights();
    fetchOptions();
  }, []);

  const fetchFlights = async () => {
    try {
      const { data } = await axios.get('/api/flights');
      setFlights(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load flights');
    }
  };

  const fetchOptions = async () => {
    try {
      const [acRes, apRes] = await Promise.all([
        axios.get('/api/aircraft'),
        axios.get('/api/airports'),
      ]);
      setAircraftOptions(acRes.data);
      setAirportOptions(apRes.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load lookup data');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedFlight) {
        await axios.put(`/api/flights/${selectedFlight.id}`, formData);
      } else {
        await axios.post('/api/flights', formData);
      }
      resetForm();
      fetchFlights();
    } catch (err) {
      console.error(err);
      setError('Save failed');
    }
  };

  const handleEdit = (flight) => {
    setSelectedFlight(flight);
    setFormData({
      flightNumber: flight.flightNumber || '',
      aircraftId: flight.aircraftId || '',
      departureAirportId: flight.departureAirportId || '',
      arrivalAirportId: flight.arrivalAirportId || '',
      departureTime: flight.departureTime
        ? flight.departureTime.slice(0, 16)
        : '',
      arrivalTime: flight.arrivalTime ? flight.arrivalTime.slice(0, 16) : '',
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/flights/${id}`);
      setFlights((curr) => curr.filter((f) => f.id !== id));
    } catch (err) {
      console.error(err);
      setError('Delete failed');
    }
  };

  const resetForm = () => {
    setSelectedFlight(null);
    setFormData({
      flightNumber: '',
      aircraftId: '',
      departureAirportId: '',
      arrivalAirportId: '',
      departureTime: '',
      arrivalTime: '',
    });
    setError(null);
  };

  if (error) return <div className="error">{error}</div>;
  if (!Array.isArray(flights)) return <div>Loading…</div>;

  return (
    <div className="container">
      <h1>Flights</h1>

      <form onSubmit={handleSubmit} className="form-row">
        <input
          name="flightNumber"
          placeholder="Flight #"
          value={formData.flightNumber}
          onChange={handleChange}
        />
        <select
          name="aircraftId"
          value={formData.aircraftId}
          onChange={handleChange}
        >
          <option value="">Select Aircraft</option>
          {aircraftOptions.map((ac) => (
            <option key={ac.id} value={ac.id}>
              {ac.model}
            </option>
          ))}
        </select>
        <select
          name="departureAirportId"
          value={formData.departureAirportId}
          onChange={handleChange}
        >
          <option value="">Departure Airport</option>
          {airportOptions.map((ap) => (
            <option key={ap.id} value={ap.id}>
              {ap.name}
            </option>
          ))}
        </select>
        <select
          name="arrivalAirportId"
          value={formData.arrivalAirportId}
          onChange={handleChange}
        >
          <option value="">Arrival Airport</option>
          {airportOptions.map((ap) => (
            <option key={ap.id} value={ap.id}>
              {ap.name}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          name="departureTime"
          value={formData.departureTime}
          onChange={handleChange}
        />
        <input
          type="datetime-local"
          name="arrivalTime"
          value={formData.arrivalTime}
          onChange={handleChange}
        />
        <button type="submit">
          {selectedFlight ? 'Update Flight' : 'Add Flight'}
        </button>
        {selectedFlight && (
          <button type="button" onClick={resetForm}>
            Cancel
          </button>
        )}
      </form>

      <table>
        <thead>
          <tr>
            <th>Flight #</th>
            <th>Aircraft</th>
            <th>Departure</th>
            <th>Arrival</th>
            <th>Dept. Time</th>
            <th>Arr. Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {flights.map((f) => (
            <tr key={f.id}>
              <td>{f.flightNumber}</td>
              <td>{f.aircraftId}</td>
              <td>{f.departureAirportId}</td>
              <td>{f.arrivalAirportId}</td>
              <td>{f.departureTime}</td>
              <td>{f.arrivalTime}</td>
              <td>
                <button onClick={() => handleEdit(f)}>Edit</button>
                <button onClick={() => handleDelete(f.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
