import React, { useState } from 'react';

function Header({ username, role, prestigeCount, prestigeBonus, resetGame, onLogout, onSwitchRole }) {
  const [confirmReset, setConfirmReset] = useState(false);

  const handleReset = () => {
    if (confirmReset) {
      resetGame();
      setConfirmReset(false);
    } else {
      setConfirmReset(true);
      setTimeout(() => setConfirmReset(false), 3000);
    }
  };

  return (
    <header className="header">
      <div className="header-title">
        <span className="cookie-icon">🍪</span>
        <h1>Hitema Clicker</h1>
      </div>
      <div className="header-badges">
        <div className="badge user-badge" onClick={onSwitchRole} title="Cliquer pour changer de rôle">
          <span>{role === 'admin' ? '🛡️' : '🎮'}</span>
          <span>{username}</span>
          <span className="role-tag">{role === 'admin' ? 'Admin' : 'Joueur'}</span>
        </div>
        {prestigeCount > 0 && (
          <div className="badge prestige">
            🌌 {prestigeCount} prestige{prestigeCount > 1 ? 's' : ''}
          </div>
        )}
        {prestigeBonus > 0 && (
          <div className="badge prestige">
            +{(prestigeBonus * 10).toFixed(0)}% bonus
          </div>
        )}
        <button className="reset-btn" onClick={handleReset}>
          {confirmReset ? 'Confirmer ?' : 'Reset'}
        </button>
        <button className="logout-btn" onClick={onLogout}>
          Déconnexion
        </button>
      </div>
    </header>
  );
}

export default React.memo(Header);
