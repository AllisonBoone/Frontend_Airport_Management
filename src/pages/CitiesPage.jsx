import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function CitiesPage() {
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    population: '',
    province: '',
    country: '',
  });
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCities();
  }, []);

  const fetchCities = async () => {
    try {
      const { data } = await axios.get('/api/cities');
      setCities(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching cities:', err);
      setError('Failed to load cities');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selected) {
        await axios.put(`/api/cities/${selected.id}`, formData);
      } else {
        await axios.post('/api/cities', formData);
      }
      setFormData({ name: '', population: '', province: '', country: '' });
      setSelected(null);
      fetchCities();
    } catch (err) {
      console.error('Error saving city:', err);
      setError(err.response?.data?.message || 'Failed to save city');
    }
  };

  const handleEdit = (city) => {
    setSelected(city);
    setFormData({
      name: city.name || '',
      population: city.population || '',
      province: city.province || '',
      country: city.country || '',
    });
    setError(null);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this city?')) return;
    try {
      await axios.delete(`/api/cities/${id}`);
      setCities((prev) => prev.filter((c) => c.id !== id));
      setError(null);
    } catch (err) {
      console.error('Error deleting city:', err);
      setError('Failed to delete city');
    }
  };

  return (
    <div className="container">
      <h1>Cities</h1>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="form-row">
        <input
          name="name"
          placeholder="City Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          name="population"
          type="number"
          placeholder="Population"
          value={formData.population}
          onChange={handleChange}
          required
        />
        <input
          name="province"
          placeholder="Province"
          value={formData.province}
          onChange={handleChange}
          required
        />
        <input
          name="country"
          placeholder="Country"
          value={formData.country}
          onChange={handleChange}
          required
        />
        <button type="submit">{selected ? 'Update City' : 'Add City'}</button>
        {selected && (
          <button
            type="button"
            onClick={() => {
              setSelected(null);
              setFormData({
                name: '',
                population: '',
                province: '',
                country: '',
              });
              setError(null);
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
            <th>Population</th>
            <th>Province</th>
            <th>Country</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {cities.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.population}</td>
              <td>{c.province}</td>
              <td>{c.country}</td>
              <td>
                <button onClick={() => handleEdit(c)}>Edit</button>
                <button onClick={() => handleDelete(c.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
