import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081/api';

// Cities
export const getCities = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/cities`);
  return data;
};
export const createCity = async (city) => {
  const { data } = await axios.post(`${API_BASE_URL}/cities`, city);
  return data;
};
export const updateCity = async (id, city) => {
  const { data } = await axios.put(`${API_BASE_URL}/cities/${id}`, city);
  return data;
};
export const deleteCity = async (id) => {
  const { data } = await axios.delete(`${API_BASE_URL}/cities/${id}`);
  return data;
};

// Aircraft
export const getAircraft = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/aircraft`);
  return data;
};
export const createAircraft = async (aircraft) => {
  const { data } = await axios.post(`${API_BASE_URL}/aircraft`, aircraft);
  return data;
};
export const updateAircraft = async (id, aircraft) => {
  const { data } = await axios.put(`${API_BASE_URL}/aircraft/${id}`, aircraft);
  return data;
};
export const deleteAircraft = async (id) => {
  const { data } = await axios.delete(`${API_BASE_URL}/aircraft/${id}`);
  return data;
};

// Airports
export const getAirports = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/airports`);
  return data;
};
export const createAirport = async (airport) => {
  const { data } = await axios.post(`${API_BASE_URL}/airports`, airport);
  return data;
};
export const updateAirport = async (id, airport) => {
  const { data } = await axios.put(`${API_BASE_URL}/airports/${id}`, airport);
  return data;
};
export const deleteAirport = async (id) => {
  const { data } = await axios.delete(`${API_BASE_URL}/airports/${id}`);
  return data;
};

// Flights
export const getFlights = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/flights`);
  return data;
};
export const createFlight = async (flight) => {
  const { data } = await axios.post(`${API_BASE_URL}/flights`, flight);
  return data;
};
export const updateFlight = async (id, flight) => {
  const { data } = await axios.put(`${API_BASE_URL}/flights/${id}`, flight);
  return data;
};
export const deleteFlight = async (id) => {
  const { data } = await axios.delete(`${API_BASE_URL}/flights/${id}`);
  return data;
};

// Passengers
export const getPassengers = async () => {
  const { data } = await axios.get(`${API_BASE_URL}/passengers`);
  return data;
};
export const createPassenger = async (passenger) => {
  const { data } = await axios.post(`${API_BASE_URL}/passengers`, passenger);
  return data;
};
export const updatePassenger = async (id, passenger) => {
  const { data } = await axios.put(
    `${API_BASE_URL}/passengers/${id}`,
    passenger
  );
  return data;
};
export const deletePassenger = async (id) => {
  const { data } = await axios.delete(`${API_BASE_URL}/passengers/${id}`);
  return data;
};
