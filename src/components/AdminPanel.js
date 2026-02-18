import React, { useState } from 'react';
import { formatNumber } from '../App';

function AdminPanel({ leaderboard, onResetPlayer, onSetCookies }) {
  const [selectedPlayer, setSelectedPlayer] = useState('');
  const [cookieAmount, setCookieAmount] = useState('');
  const [confirmReset, setConfirmReset] = useState(null);

  const players = Object.entries(leaderboard).map(([name, data]) => ({ name, ...data }));

  const handleReset = (name) => {
    if (confirmReset === name) {
      onResetPlayer(name);
      setConfirmReset(null);
    } else {
      setConfirmReset(name);
      setTimeout(() => setConfirmReset(null), 3000);
    }
  };

  const handleSetCookies = (e) => {
    e.preventDefault();
    if (!selectedPlayer || !cookieAmount) return;
    const amount = parseInt(cookieAmount, 10);
    if (isNaN(amount) || amount < 0) return;
    onSetCookies(selectedPlayer, amount);
    setCookieAmount('');
  };

  return (
    <div className="admin-panel">
      <div className="section-header">Panneau d'administration</div>

      <div className="admin-section">
        <h3 className="admin-section-title">Modifier les cookies d'un joueur</h3>
        <form onSubmit={handleSetCookies} className="admin-form">
          <select
            className="admin-select"
            value={selectedPlayer}
            onChange={(e) => setSelectedPlayer(e.target.value)}
          >
            <option value="">Choisir un joueur...</option>
            {players.map(p => (
              <option key={p.name} value={p.name}>{p.name}</option>
            ))}
          </select>
          <input
            type="number"
            className="admin-input"
            placeholder="Nombre de cookies"
            value={cookieAmount}
            onChange={(e) => setCookieAmount(e.target.value)}
            min="0"
          />
          <button type="submit" className="admin-btn apply" disabled={!selectedPlayer || !cookieAmount}>
            Appliquer
          </button>
        </form>
      </div>

      <div className="admin-section">
        <h3 className="admin-section-title">Gestion des joueurs</h3>
        {players.length === 0 ? (
          <p className="admin-empty">Aucun joueur enregistré</p>
        ) : (
          <div className="admin-player-list">
            {players.map(p => (
              <div key={p.name} className="admin-player-row">
                <div className="admin-player-info">
                  <div className="admin-player-name">{p.name}</div>
                  <div className="admin-player-stats">
                    {formatNumber(p.totalCookies || 0)} cookies totaux — {formatNumber(p.cps || 0)}/s
                  </div>
                </div>
                <button
                  className={`admin-btn danger ${confirmReset === p.name ? 'confirming' : ''}`}
                  onClick={() => handleReset(p.name)}
                >
                  {confirmReset === p.name ? 'Confirmer ?' : 'Réinitialiser'}
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default React.memo(AdminPanel);
