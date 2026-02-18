import React from 'react';
import { formatNumber } from '../App';

function Stats({ cookies, cps, cpm, multiplicateur, prestigeBonus, clickCount, totalCookies, totalBuildings }) {
  return (
    <div className="stats-container">
      <div className="cookie-count">{formatNumber(cookies)}</div>
      <div className="cookie-label">cookies</div>
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-value">{formatNumber(cps)}</div>
          <div className="stat-label">par seconde</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{formatNumber(cpm)}</div>
          <div className="stat-label">par minute</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">x{multiplicateur}</div>
          <div className="stat-label">multiplicateur</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{formatNumber(clickCount)}</div>
          <div className="stat-label">clics totaux</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{formatNumber(totalCookies)}</div>
          <div className="stat-label">cookies totaux</div>
        </div>
        <div className="stat-card">
          <div className="stat-value">{totalBuildings}</div>
          <div className="stat-label">bâtiments</div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(Stats);
