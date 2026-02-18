import React, { useState } from 'react';

function LoginScreen({ existingUsers, onLogin }) {
  const [username, setUsername] = useState('');
  const [selectedRole, setSelectedRole] = useState('player');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = username.trim();
    if (!trimmed) {
      setError('Veuillez entrer un nom d\'utilisateur');
      return;
    }
    if (trimmed.length < 2) {
      setError('Minimum 2 caractères');
      return;
    }
    if (trimmed.length > 20) {
      setError('Maximum 20 caractères');
      return;
    }
    onLogin(trimmed, selectedRole);
  };

  const handleLoadUser = (user) => {
    setUsername(user);
    onLogin(user, selectedRole);
  };

  return (
    <div className="login-screen">
      <div className="login-bg-pattern" />
      <div className="login-card">
        <div className="login-header">
          <span className="login-cookie">🍪</span>
          <h1 className="login-title">Hitema Clicker</h1>
          <p className="login-subtitle">Choisissez votre identité</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="login-field">
            <label className="login-label">Nom d'utilisateur</label>
            <input
              type="text"
              className="login-input"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(''); }}
              placeholder="Entrez votre pseudo..."
              autoFocus
              maxLength={20}
            />
            {error && <div className="login-error">{error}</div>}
          </div>

          <div className="login-field">
            <label className="login-label">Rôle</label>
            <div className="login-roles">
              <button
                type="button"
                className={`role-btn ${selectedRole === 'player' ? 'active' : ''}`}
                onClick={() => setSelectedRole('player')}
              >
                <span className="role-icon">🎮</span>
                <span className="role-name">Joueur</span>
              </button>
              <button
                type="button"
                className={`role-btn ${selectedRole === 'admin' ? 'active' : ''}`}
                onClick={() => setSelectedRole('admin')}
              >
                <span className="role-icon">🛡️</span>
                <span className="role-name">Admin</span>
              </button>
            </div>
          </div>

          <button type="submit" className="login-submit">
            Jouer
          </button>
        </form>

        {existingUsers.length > 0 && (
          <div className="login-existing">
            <div className="login-divider">
              <span>Parties sauvegardées</span>
            </div>
            <div className="login-user-list">
              {existingUsers.map(user => (
                <button
                  key={user}
                  className="login-user-btn"
                  onClick={() => handleLoadUser(user)}
                >
                  <span className="login-user-avatar">👤</span>
                  <span className="login-user-name">{user}</span>
                  <span className="login-user-arrow">→</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginScreen;
