import React from 'react';

export default function ProgressBar({ progress }) {
  return (
    <div className="progress-container">
      <div
        className="progress-bar"
        style={{
          width: `${Math.max(0, Math.min(progress * 100, 100))}%`,
        }}
      />
    </div>
  );
}
