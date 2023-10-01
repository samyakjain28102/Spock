import React, { useState, useEffect } from 'react';

const CountdownTimer = ({ time }) => {
  const [seconds, setSeconds] = useState(time);

  useEffect(() => {
    if (seconds > 0) {
      const timer = setTimeout(() => setSeconds(seconds - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [seconds]);

  const restartTimer = () => {
    setSeconds(time);
  };

  return (
    <div>
      {seconds === 0 ? ( <button className="btn primary" onClick={restartTimer}>Restart Timer</button>
      ) : (
        <h1>{seconds}</h1>
      )}
    </div>
  );
};

export default CountdownTimer;
