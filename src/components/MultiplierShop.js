import React from 'react';
import { formatNumber } from '../App';

function MultiplierShop({ multipliers, cookies, onBuy }) {
  const available = multipliers.filter(m => m.level < m.maxLevel);
  const maxed = multipliers.filter(m => m.level >= m.maxLevel);

  return (
    <div>
      {available.length > 0 && (
        <>
          <div className="section-header">Multiplicateurs de clic</div>
          <div className="multiplier-list">
            {available.map(multi => {
              const cost = Math.floor(multi.baseCost * Math.pow(2.5, multi.level));
              const canAfford = cookies >= cost;
              return (
                <div
                  key={multi.id}
                  className={`multiplier-card ${canAfford ? 'affordable' : 'disabled'}`}
                  onClick={() => onBuy(multi.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && onBuy(multi.id)}
                >
                  <div className="multiplier-icon">{multi.icon}</div>
                  <div className="multiplier-info">
                    <div className="multiplier-name">
                      {multi.name}
                      <span className="multiplier-level">Niv. {multi.level}/{multi.maxLevel}</span>
                    </div>
                    <div className="multiplier-desc">
                      +{multi.bonusPerLevel} au multiplicateur par niveau
                    </div>
                    <div className="multiplier-bar-track">
                      <div
                        className="multiplier-bar-fill"
                        style={{ width: `${(multi.level / multi.maxLevel) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="multiplier-right">
                    <div className={`multiplier-cost ${canAfford ? 'can-afford' : 'cannot-afford'}`}>
                      {formatNumber(cost)}
                    </div>
                    <div className="upgrade-cost-label">cookies</div>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      {maxed.length > 0 && (
        <>
          <div className="section-header" style={{ marginTop: available.length > 0 ? 24 : 0 }}>
            Niveau maximum
          </div>
          <div className="multiplier-list">
            {maxed.map(multi => (
              <div key={multi.id} className="multiplier-card purchased">
                <div className="multiplier-icon">{multi.icon}</div>
                <div className="multiplier-info">
                  <div className="multiplier-name">{multi.name}</div>
                  <div className="multiplier-desc">
                    Niv. {multi.level}/{multi.maxLevel} — +{multi.bonusPerLevel * multi.level} total
                  </div>
                </div>
                <div className="multiplier-right">
                  <div className="purchased-badge">MAX</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default React.memo(MultiplierShop);
