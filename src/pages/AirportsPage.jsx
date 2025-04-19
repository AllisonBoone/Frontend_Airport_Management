import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AirportsPage() {
  const [airports, setAirports] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({ name: '', code: '', cityId: '' });
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, []);

  // Load airports and cities
  const fetchData = async () => {
    try {
      const [airRes, cityRes] = await Promise.all([
        axios.get('/api/airports'),
        axios.get('/api/cities'),
      ]);
      setAirports(airRes.data);
      setCities(cityRes.data);
    } catch (err) {
      console.error(err);
      setError('Failed to load data');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, code, cityId } = formData;
    if (!name || !code || !cityId) {
      setError('All fields are required');
      return;
    }
    try {
      if (selected) {
        await axios.put(`/api/airports/${selected.id}`, { name, code, cityId });
      } else {
        await axios.post('/api/airports', { name, code, cityId });
      }
      setFormData({ name: '', code: '', cityId: '' });
      setSelected(null);
      setError('');
      fetchData();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Save failed');
    }
  };

  const handleEdit = (airport) => {
    setSelected(airport);
    setFormData({
      name: airport.name,
      code: airport.code,
      cityId: airport.city.id || airport.cityId,
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this airport?'))
      return;
    try {
      await axios.delete(`/api/airports/${id}`);
      setAirports((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
      setError('Delete failed');
    }
  };

  return (
    <div className="container">
      <h1>Airports</h1>
      {error && <div className="error">{error}</div>}
      <form onSubmit={handleSubmit} className="form-row">
        <input
          name="name"
          placeholder="Airport Name"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="code"
          placeholder="Code"
          value={formData.code}
          onChange={handleChange}
        />
        <select name="cityId" value={formData.cityId} onChange={handleChange}>
          <option value="">Select City</option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button type="submit">
          {selected ? 'Update Airport' : 'Add Airport'}
        </button>
        {selected && (
          <button
            type="button"
            onClick={() => {
              setSelected(null);
              setFormData({ name: '', code: '', cityId: '' });
              setError('');
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Code</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {airports.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.code}</td>
              <td>{a.city?.name}</td>
              <td>
                <button onClick={() => handleEdit(a)}>Edit</button>
                <button onClick={() => handleDelete(a.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
