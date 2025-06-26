import React from 'react';
import TimerCard from './TimerCard';

const CATEGORY_COLORS = {
  Workout: '#FFB74D',
  Study: '#64B5F6',
  Break: '#81C784',
};

export default function CategorySection({ category, timers, handleBulk }) {
  return (
    <div className="category-section" style={{ borderLeft: `5px solid ${CATEGORY_COLORS[category] || '#ccc'}` }}>
      <h3>{category}</h3>
      <div className="bulk-buttons">
        <button onClick={() => handleBulk(category, 'start')}>Start All</button>
        <button onClick={() => handleBulk(category, 'pause')}>Pause All</button>
        <button onClick={() => handleBulk(category, 'reset')}>Reset All</button>
      </div>
      {timers.map(timer => (
        <TimerCard key={timer.id} timer={timer} />
      ))}
    </div>
  );
}
