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

  const hours = time.getHours() % 12 || 12;
  const minutes = time.getMinutes().toString().padStart(2, '0');
  const seconds = time.getSeconds().toString().padStart(2, '0');
  const amPm = time.getHours() >= 12 ? 'PM' : 'AM';

  return (
    <div className={`${className}`}>
      {hours}:{minutes}:{seconds} {amPm}
    </div>
  );
}

export default LiveClock;
