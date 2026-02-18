import React, { useEffect } from 'react';

function FeedbackMessage({ message, type, onDone }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      if (onDone) onDone();
    }, 2200);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div className={`feedback-toast ${type}`}>
      {message}
    </div>
  );
}

export default React.memo(FeedbackMessage);
