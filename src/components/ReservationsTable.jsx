import React, { useState, useEffect } from 'react';

export default function ReservationsTable() {
  const [reservations, setReservations] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Non authentifié');
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/reservations`,
        { 
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          } 
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expirée');
        }
        throw new Error('Erreur lors de la récupération des réservations');
      }

      const data = await response.json();
      setReservations(data.data || []);
    } catch (err) {
      setError(err.message);
      console.error('Erreur:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Non authentifié');
      }

      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/api/reservations/${id}`,
        {
          method: 'DELETE',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Session expirée');
        }
        throw new Error('Erreur lors de la suppression');
      }

      setReservations(reservations.filter(r => r._id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Erreur:', err);
    }
  };

  if (error) {
    return (
      <div className="container mx-auto p-4 text-gold">
        <div className="bg-red-500 text-white p-4 rounded">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 text-gold">
      <h1 className="text-3xl font-bold mb-4">Gestion des Réservations</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-noir border border-gold">
          <thead>
            <tr className="bg-gold bg-opacity-20">
              <th className="px-4 py-2">Service</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Heure</th>
              <th className="px-4 py-2">Nom</th>
              <th className="px-4 py-2">Téléphone</th>
              <th className="px-4 py-2">E-mail</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((reservation) => (
              <tr key={reservation._id} className="border-t border-gold">
                <td className="px-4 py-2">{reservation.service}</td>
                <td className="px-4 py-2">{new Date(reservation.date).toLocaleDateString()}</td>
                <td className="px-4 py-2">{reservation.time}</td>
                <td className="px-4 py-2">{reservation.name}</td>
                <td className="px-4 py-2">{reservation.phone}</td>
                <td className="px-4 py-2">{reservation.email}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => handleDelete(reservation._id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 