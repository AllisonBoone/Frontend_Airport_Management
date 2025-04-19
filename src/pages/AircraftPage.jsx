import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function AircraftPage() {
  const [aircraft, setAircraft] = useState([]);
  const [formData, setFormData] = useState({
    model: '',
    manufacturer: '',
    capacity: '',
  });
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAircraft();
  }, []);

  const loadAircraft = async () => {
    try {
      const { data } = await axios.get('/api/aircraft');
      setAircraft(data);
    } catch (err) {
      console.error(err);
      setError('Failed to load aircraft');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((old) => ({ ...old, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!formData.model || !formData.manufacturer || !formData.capacity) {
      setError('All fields are required');
      return;
    }

    const payload = {
      model: formData.model,
      manufacturer: formData.manufacturer,
      capacity: parseInt(formData.capacity, 10),
    };

    try {
      if (selected) {
        await axios.put(`/api/aircraft/${selected.id}`, payload);
      } else {
        await axios.post('/api/aircraft', payload);
      }
      setFormData({ model: '', manufacturer: '', capacity: '' });
      setSelected(null);
      loadAircraft();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Save failed');
    }
  };

  const handleEdit = (a) => {
    setSelected(a);
    setFormData({
      model: a.model,
      manufacturer: a.manufacturer,
      capacity: String(a.capacity),
    });
    setError(null);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/aircraft/${id}`);
      setAircraft((curr) => curr.filter((a) => a.id !== id));
    } catch (err) {
      console.error(err);
      setError('Delete failed');
    }
  };

  return (
    <div className="container">
      <h1>Aircraft</h1>
      {error && <div className="error">{error}</div>}

      <form onSubmit={handleSubmit} className="form-row">
        <input
          name="model"
          placeholder="Model"
          value={formData.model}
          onChange={handleChange}
        />
        <input
          name="manufacturer"
          placeholder="Manufacturer"
          value={formData.manufacturer}
          onChange={handleChange}
        />
        <input
          name="capacity"
          type="number"
          placeholder="Capacity"
          value={formData.capacity}
          onChange={handleChange}
        />
        <button type="submit">{selected ? 'Update' : 'Add'} Aircraft</button>
        {selected && (
          <button
            type="button"
            onClick={() => {
              setSelected(null);
              setFormData({ model: '', manufacturer: '', capacity: '' });
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
            <th>Model</th>
            <th>Manufacturer</th>
            <th>Capacity</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {aircraft.map((a) => (
            <tr key={a.id}>
              <td>{a.model}</td>
              <td>{a.manufacturer}</td>
              <td>{a.capacity}</td>
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
