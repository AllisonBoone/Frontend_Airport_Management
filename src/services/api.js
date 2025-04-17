// src/api.js
import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api';

// === Cities ===
export const getCities = () => axios.get(`${BASE_URL}/cities`);
export const addCity = (city) => axios.post(`${BASE_URL}/cities`, city);
export const updateCity = (id, city) =>
  axios.put(`${BASE_URL}/cities/${id}`, city);
export const deleteCity = (id) => axios.delete(`${BASE_URL}/cities/${id}`);

// === Airports ===
export const getAirports = () => axios.get(`${BASE_URL}/airports`);
export const addAirport = (airport) =>
  axios.post(`${BASE_URL}/airports`, airport);
export const updateAirport = (id, airport) =>
  axios.put(`${BASE_URL}/airports/${id}`, airport);
export const deleteAirport = (id) => axios.delete(`${BASE_URL}/airports/${id}`);

// === Aircraft ===
export const getAircraft = () => axios.get(`${BASE_URL}/aircraft`);
export const addAircraft = (aircraft) =>
  axios.post(`${BASE_URL}/aircraft`, aircraft);
export const updateAircraft = (id, aircraft) =>
  axios.put(`${BASE_URL}/aircraft/${id}`, aircraft);
export const deleteAircraft = (id) =>
  axios.delete(`${BASE_URL}/aircraft/${id}`);

// === Passengers ===
export const getPassengers = () => axios.get(`${BASE_URL}/passengers`);
export const addPassenger = (passenger) =>
  axios.post(`${BASE_URL}/passengers`, passenger);
export const updatePassenger = (id, passenger) =>
  axios.put(`${BASE_URL}/passengers/${id}`, passenger);
export const deletePassenger = (id) =>
  axios.delete(`${BASE_URL}/passengers/${id}`);

// === Flights ===
export const getFlights = () => axios.get(`${BASE_URL}/flights`);
export const addFlight = (flight) => axios.post(`${BASE_URL}/flights`, flight);
export const updateFlight = (id, flight) =>
  axios.put(`${BASE_URL}/flights/${id}`, flight);
export const deleteFlight = (id) => axios.delete(`${BASE_URL}/flights/${id}`);
