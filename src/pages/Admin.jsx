import React, { useState } from 'react';
import axios from 'axios';
import ReservationsTable from '../components/ReservationsTable';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/auth/login`,
        { email: 'admin@sahar.com', password }
      );
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      setError('');
    } catch (err) {
      setError('Échec de l\'authentification');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-4">Administration</h1>
        <form onSubmit={handleLogin} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit" className="bg-gold text-noir px-4 py-2 rounded">
            Se connecter
          </button>
        </form>
      </div>
    );
  }

  return <ReservationsTable />;
} 