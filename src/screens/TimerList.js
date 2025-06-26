// src/screens/TimerList.js
import React, { useState, useEffect } from 'react';

const TimerList = () => {
  const [timers, setTimers] = useState([]);

  useEffect(() => {
    const savedTimers = JSON.parse(localStorage.getItem('timers')) || [];
    setTimers(savedTimers);
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>Timer List</h2>
      {timers.length === 0 ? (
        <p>No timers found.</p>
      ) : (
        timers.map((timer, index) => (
          <div key={index} style={{ border: '1px solid #ccc', margin: 10, padding: 10 }}>
            <h3>{timer.name}</h3>
            <p>Category: {timer.category}</p>
            <p>Duration: {timer.duration}s</p>
          </div>
        ))
      )}
    </div>
  );
};

export default TimerList;
