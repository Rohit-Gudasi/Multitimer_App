import React, { useEffect, useState } from 'react';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('history')) || [];
    stored.sort((a, b) => b.completedAt - a.completedAt);
    setHistory(stored);
  }, []);

  const grouped = history.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div className="history-screen">
      <h2 className="history-title">📜 Completed Timers</h2>
      {history.length === 0 ? (
        <p className="no-history">No history yet.</p>
      ) : (
        Object.entries(grouped).map(([category, items]) => (
          <div key={category} className="history-category">
            <h3>{category}</h3>
            <ul>
              {items.map((item, i) => (
                <li key={i} className="history-item">
                  <span className="history-name">{item.name}</span>
                  <span className="history-time">
                    {new Date(item.completedAt).toLocaleString()}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
