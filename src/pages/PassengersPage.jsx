import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function PassengersPage() {
  const [passengers, setPassengers] = useState([]);
  const [cities, setCities] = useState([]);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    cityId: '',
  });
  const [selected, setSelected] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, cRes] = await Promise.all([
          axios.get('/api/passengers'),
          axios.get('/api/cities'),
        ]);
        setPassengers(pRes.data);
        setCities(cRes.data);
      } catch (err) {
        console.error(err);
        setError('Failed to load data');
      }
    };
    fetchData();
  }, []);

  if (error) return <div className="error">{error}</div>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selected) {
        await axios.put(`/api/passengers/${selected.id}`, formData);
      } else {
        await axios.post('/api/passengers', formData);
      }
      const { data } = await axios.get('/api/passengers');
      setPassengers(data);
      setFormData({ firstName: '', lastName: '', email: '', cityId: '' });
      setSelected(null);
      setError(null);
    } catch (err) {
      console.error('Error saving passenger:', err);
      setError('Save failed');
    }
  };

  const handleEdit = (p) => {
    setSelected(p);
    setFormData({
      firstName: p.firstName,
      lastName: p.lastName,
      email: p.email,
      cityId: p.cityId || '',
    });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/passengers/${id}`);
      setPassengers(passengers.filter((p) => p.id !== id));
    } catch (err) {
      console.error('Error deleting passenger:', err);
      setError('Delete failed');
    }
  };

  return (
    <div className="container">
      <h1>Passengers</h1>
      <form onSubmit={handleSubmit} className="form-row">
        <input
          name="firstName"
          placeholder="First Name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          name="lastName"
          placeholder="Last Name"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
        <select name="cityId" value={formData.cityId} onChange={handleChange}>
          <option value="">-- Select City --</option>
          {cities.map((c) => (
            <option key={c.id} value={c.id}>
              {c.name}
            </option>
          ))}
        </select>
        <button type="submit">
          {selected ? 'Update Passenger' : 'Add Passenger'}
        </button>
        {selected && (
          <button
            type="button"
            onClick={() => {
              setSelected(null);
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                cityId: '',
              });
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table>
        <thead>
          <tr>
            <th>First</th>
            <th>Last</th>
            <th>Email</th>
            <th>City</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {passengers.map((p) => (
            <tr key={p.id}>
              <td>{p.firstName}</td>
              <td>{p.lastName}</td>
              <td>{p.email}</td>
              <td>{p.cityName || '-'}</td>
              <td>
                <button onClick={() => handleEdit(p)}>Edit</button>
                <button onClick={() => handleDelete(p.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
