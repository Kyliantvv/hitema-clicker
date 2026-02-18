import React from 'react';
import { formatNumber } from '../App';

const MEDALS = ['🥇', '🥈', '🥉'];

function Leaderboard({ board, currentUser }) {
  const entries = Object.entries(board)
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.totalCookies - a.totalCookies);

  if (entries.length === 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📊</div>
        <div className="empty-state-text">Aucun joueur pour le moment.</div>
      </div>
    );
  }

  return (
    <div>
      <div className="section-header">Classement des joueurs</div>
      <div className="leaderboard-list">
        {entries.map((entry, i) => (
          <div
            key={entry.name}
            className={`leaderboard-row ${entry.name === currentUser ? 'current-user' : ''} ${i < 3 ? 'top-' + (i + 1) : ''}`}
          >
            <div className="leaderboard-rank">
              {i < 3 ? MEDALS[i] : `#${i + 1}`}
            </div>
            <div className="leaderboard-info">
              <div className="leaderboard-name">
                {entry.name}
                {entry.name === currentUser && <span className="leaderboard-you">vous</span>}
              </div>
              <div className="leaderboard-details">
                <span>{formatNumber(entry.cps || 0)}/s</span>
                <span>{formatNumber(entry.clickCount || 0)} clics</span>
                <span>{entry.buildings || 0} bâtiments</span>
              </div>
            </div>
            <div className="leaderboard-score">
              <div className="leaderboard-score-value">{formatNumber(entry.totalCookies)}</div>
              <div className="leaderboard-score-label">cookies totaux</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default React.memo(Leaderboard);
