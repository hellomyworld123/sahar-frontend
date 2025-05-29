import React, { useState } from 'react';
import ReservationsTable from '../components/ReservationsTable';

export default function Admin() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          email: 'admin@sahar.com', 
          password: password 
        }),
      });

      if (!response.ok) {
        throw new Error('Échec de l\'authentification');
      }

      const data = await response.json();
      localStorage.setItem('token', data.token);
      setIsAuthenticated(true);
      setError('');
    } catch (err) {
      setError('Mot de passe incorrect');
      console.error('Erreur de login:', err);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="container mx-auto p-4 text-gold">
        <h1 className="text-3xl font-bold mb-4">Administration</h1>
        <form onSubmit={handleLogin} className="max-w-md">
          <div className="mb-4">
            <label htmlFor="password" className="block mb-2">Mot de passe</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border rounded bg-noir text-gold border-gold"
              required
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button type="submit" className="bg-gold text-noir px-4 py-2 rounded hover:bg-rose transition-colors">
            Se connecter
          </button>
        </form>
      </div>
    );
  }

  return <ReservationsTable />;
} 