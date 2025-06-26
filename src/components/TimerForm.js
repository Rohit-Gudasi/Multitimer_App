import React, { useState, useContext } from 'react';
import { TimerContext } from '../context/TimerContext';
import { generateId } from '../utils/timeUtils';

const CATEGORIES = ['Workout', 'Study', 'Break'];

export default function TimerForm() {
  const { dispatch } = useContext(TimerContext);
  const [name, setName] = useState('');
  const [duration, setDuration] = useState('');
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [halfwayAlert, setHalfwayAlert] = useState(false);

  const handle = e => {
    e.preventDefault();
    const dur = parseInt(duration, 10);
    if (!name || !dur || !category) return;
    dispatch({
      type: 'ADD_TIMER',
      payload: {
        id: generateId(),
        name,
        duration: dur,
        remaining: dur,
        category,
        status: 'idle',
        halfwayAlert,
        halfwayAlertTriggered: false
      }
    });
    setName('');
    setDuration('');
    setCategory(CATEGORIES[0]);
    setHalfwayAlert(false);
  };

  return (
    <form onSubmit={handle} className="timer-form">
      <input value={name} placeholder="Name" onChange={e => setName(e.target.value)} />
      <input type="number" value={duration} placeholder="Duration (seconds)" onChange={e => setDuration(e.target.value)} />
      <select value={category} onChange={e => setCategory(e.target.value)}>
        {CATEGORIES.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
      <label className="checkbox-label">
        <input
            type="checkbox"
            checked={halfwayAlert}
            onChange={e => setHalfwayAlert(e.target.checked)}
        />
        <span>Halfway Alert</span>
        </label>

      <button type="submit">Add Timer</button>
    </form>
  );
}
