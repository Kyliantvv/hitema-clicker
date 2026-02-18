import React from 'react';

function ParticleManager({ particles }) {
  return (
    <div className="particle-container">
      {particles.map(p => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.x,
            top: p.y,
          }}
        >
          {p.value}
        </div>
      ))}
    </div>
  );
}

export default React.memo(ParticleManager);
