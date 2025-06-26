import React, { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';
import TimerForm from '../components/TimerForm';
import CategorySection from '../components/CategorySection';

export default function Home() {
  const { state, dispatch } = useContext(TimerContext);

  const grouped = state.timers.reduce((a, t) => {
    (a[t.category] ||= []).push(t);
    return a;
  }, {});

  const handleBulk = (cat, action) => {
    grouped[cat].forEach(timer => {
      if (action === 'reset') {
        dispatch({ type: 'RESET_TIMER', payload: timer.id });
      } else {
        dispatch({
          type: 'UPDATE_TIMER',
          payload: { ...timer, status: action === 'start' ? 'running' : 'paused' },
        });
      }
    });
  };

  return (
    <div className="screen">
      <TimerForm />
      {Object.entries(grouped).map(([cat, timers]) => (
        <CategorySection key={cat} category={cat} timers={timers} handleBulk={handleBulk} />
      ))}
    </div>
  );
}
