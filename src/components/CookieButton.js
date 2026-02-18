import React from 'react';
import cookieImg from '../hitema.png'; // bouton de cookieeeeee

function CookieButton({ onClick, multiplicateur, prestigeBonus }) {
  const perClick = (multiplicateur * (1 + prestigeBonus * 0.1)).toFixed(1);

  return (
    <div className="cookie-button-wrapper">
      <button className="cookie-button" onClick={onClick} aria-label="Cliquer pour des cookies">
        <img src={cookieImg} alt="Cookie" className="cookie-img" />
      </button>
      <div className="click-hint">+{perClick} par clic</div>
    </div>
  );
}

export default React.memo(CookieButton);
