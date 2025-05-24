import axios from 'axios';

const API = process.env.REACT_APP_API_URL;
if (!API) throw new Error('REACT_APP_API_URL manquant');

export const postReservation = (payload) =>
  axios.post(`${API}/api/reservations`, payload, {
    headers: { 'Content-Type': 'application/json' }
  })
  .then(res => res.data)
  .catch(err => {
    if (err.response) throw new Error(`API ${err.response.status}`);
    throw err;
  }); 