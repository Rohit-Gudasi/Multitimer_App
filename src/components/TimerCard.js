// src/components/TimerCard.js
import React, { useEffect, useRef, useContext } from 'react';
import { TimerContext } from '../context/TimerContext';
import ProgressBar from './ProgressBar';
import { formatTime } from '../utils/timeUtils';

export default function TimerCard({ timer }) {
  const { dispatch } = useContext(TimerContext);
  const interval = useRef(null);

  useEffect(() => {
    if ('Notification' in window && Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }, []);

  useEffect(() => {
    if (timer.status !== 'running') return;

    interval.current = setInterval(() => {
      dispatch({ type: 'TICK', payload: timer.id });
    }, 1000);

    return () => clearInterval(interval.current);
  }, [timer.status, dispatch, timer.id]);

  const progress = timer.remaining / timer.duration;

  return (
    <div className="timer-card">
      <h4>{timer.name}</h4>
      <p>Status: {timer.status}</p>
      <p>Time Left: {formatTime(timer.remaining)}</p>
      <ProgressBar progress={progress} />

      <div className="btn-group">
        <button
          onClick={() =>
            dispatch({
              type: 'UPDATE_TIMER',
              payload: { ...timer, status: 'running' },
            })
          }
        >
          Start
        </button>
        <button
          onClick={() =>
            dispatch({
              type: 'UPDATE_TIMER',
              payload: { ...timer, status: 'paused' },
            })
          }
        >
          Pause
        </button>
        <button
          onClick={() =>
            dispatch({ type: 'RESET_TIMER', payload: timer.id })
          }
        >
          Reset
        </button>
      </div>
    </div>
  );
}
