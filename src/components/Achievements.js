import React from 'react';

function Achievements({ all, unlocked }) {
  const unlockedSet = new Set(unlocked);
  const unlockedList = all.filter(a => unlockedSet.has(a.id));
  const lockedList = all.filter(a => !unlockedSet.has(a.id));

  return (
    <div>
      <div className="section-header">
        Succès — {unlocked.length}/{all.length} débloqués
      </div>

      {unlockedList.length > 0 && (
        <div className="achievements-grid">
          {unlockedList.map(ach => (
            <div key={ach.id} className="achievement-card unlocked">
              <div className="achievement-icon">{ach.icon}</div>
              <div className="achievement-info">
                <div className="achievement-name">{ach.name}</div>
                <div className="achievement-desc">{ach.description}</div>
              </div>
              <div className="achievement-check">&#10003;</div>
            </div>
          ))}
        </div>
      )}

      {lockedList.length > 0 && (
        <>
          <div className="section-header" style={{ marginTop: 24 }}>Verrouillés</div>
          <div className="achievements-grid">
            {lockedList.map(ach => (
              <div key={ach.id} className="achievement-card locked">
                <div className="achievement-icon locked-icon">?</div>
                <div className="achievement-info">
                  <div className="achievement-name">{ach.name}</div>
                  <div className="achievement-desc">{ach.description}</div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default React.memo(Achievements);
