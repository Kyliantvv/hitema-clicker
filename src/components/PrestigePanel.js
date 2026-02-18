import React from 'react';
import { formatNumber } from '../App';

function PrestigePanel({ totalCookies, prestigeCount, prestigeBonus, prestigeChips, canPrestige, onPrestige }) {
  return (
    <div className="prestige-panel">
      <div className="prestige-visual">
        <span className="prestige-icon">🌌</span>
        <div className="prestige-title">Prestige</div>
        <p className="prestige-description">
          Recommencez depuis le début en échange de jetons de prestige.
          Chaque jeton donne un bonus permanent de +10% à toute la production.
        </p>
      </div>

      <div className="prestige-stats">
        <div className="prestige-stat">
          <div className="prestige-stat-value">{prestigeCount}</div>
          <div className="prestige-stat-label">Prestiges</div>
        </div>
        <div className="prestige-stat">
          <div className="prestige-stat-value">{prestigeBonus}</div>
          <div className="prestige-stat-label">Jetons actuels</div>
        </div>
        <div className="prestige-stat">
          <div className="prestige-stat-value">+{(prestigeBonus * 10).toFixed(0)}%</div>
          <div className="prestige-stat-label">Bonus production</div>
        </div>
        <div className="prestige-stat">
          <div className="prestige-stat-value">{formatNumber(totalCookies)}</div>
          <div className="prestige-stat-label">Cookies totaux</div>
        </div>
      </div>

      <div className="prestige-preview">
        <div className="prestige-preview-title">En faisant prestige maintenant</div>
        <div className="prestige-preview-chips">
          +{prestigeChips} jeton{prestigeChips !== 1 ? 's' : ''}
        </div>
        <div className="prestige-preview-bonus">
          {canPrestige
            ? `Nouveau bonus : +${((prestigeBonus + prestigeChips) * 10).toFixed(0)}%`
            : 'Atteignez 1 000 000 cookies totaux'}
        </div>
      </div>

      <button
        className={`prestige-btn ${canPrestige ? 'available' : 'unavailable'}`}
        onClick={onPrestige}
        disabled={!canPrestige}
      >
        {canPrestige ? 'Prestige maintenant' : 'Pas encore disponible'}
      </button>
    </div>
  );
}

export default React.memo(PrestigePanel);
