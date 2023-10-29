import React, { useState, useEffect } from 'react';

function LiveClock({ className }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const hours = time.getHours();
  const minutes = time.getMinutes().toString().padStart(2, '0');

  return (
    <div className={`font-semibold tracking-wide ${className}`}>
      {hours}:{minutes}
    </div>
  );
}

export default LiveClock;
