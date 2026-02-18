import React from 'react';
import { formatNumber } from '../App';
import deltaImg from '../delta-removebg-preview.png';
import braguierImg from '../1766319547015-removebg-preview.png';

const ICON_IMAGES = {
  delta: deltaImg,
  braguier: braguierImg,
};

function UpgradeList({ ameliorations, cookies, onBuy }) {
  return (
    <div>
      <div className="section-header">Bâtiments de production</div>
      <div className="upgrade-list">
        {ameliorations.map(upgrade => {
          const cost = Math.floor(upgrade.baseCost * Math.pow(1.15, upgrade.count));
          const canAfford = cookies >= cost;
          const totalProduction = upgrade.bonus * upgrade.count;

          return (
            <div
              key={upgrade.id}
              className={`upgrade-card ${canAfford ? 'affordable' : 'disabled'}`}
              onClick={() => onBuy(upgrade.id)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && onBuy(upgrade.id)}
            >
              <div className="upgrade-icon">
                {upgrade.image && ICON_IMAGES[upgrade.icon] ? (
                  <img src={ICON_IMAGES[upgrade.icon]} alt={upgrade.name} className="upgrade-icon-img" />
                ) : (
                  upgrade.icon
                )}
              </div>
              <div className="upgrade-info">
                <div className="upgrade-name">
                  {upgrade.name}
                  {upgrade.count > 0 && (
                    <span className="upgrade-count">{upgrade.count}</span>
                  )}
                </div>
                <div className="upgrade-desc">{upgrade.description}</div>
                <div className="upgrade-stats">
                  <span>+{formatNumber(upgrade.bonus)}/s chacun</span>
                  {upgrade.count > 0 && (
                    <span>Total: {formatNumber(totalProduction)}/s</span>
                  )}
                </div>
              </div>
              <div className="upgrade-right">
                <div className={`upgrade-cost ${canAfford ? 'can-afford' : 'cannot-afford'}`}>
                  {formatNumber(cost)}
                </div>
                <div className="upgrade-cost-label">cookies</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default React.memo(UpgradeList);
