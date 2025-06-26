// src/context/TimerContext.js
import React, { createContext, useReducer } from 'react';
import { loadTimers, saveTimers, loadHistory, saveHistory } from '../utils/storage';
import { toast } from 'react-toastify';

const initialState = {
  timers: loadTimers(),
  history: loadHistory(),
};

export const TimerContext = createContext();

function reducer(state, action) {
  switch (action.type) {
    case 'SET_TIMERS':
      return { ...state, timers: action.payload };

    case 'ADD_TIMER': {
      const newTimers = [...state.timers, action.payload];
      saveTimers(newTimers);
      return { ...state, timers: newTimers };
    }

    case 'UPDATE_TIMER': {
      const updatedTimers = state.timers.map(t =>
        t.id === action.payload.id ? { ...t, ...action.payload } : t
      );
      saveTimers(updatedTimers);
      return { ...state, timers: updatedTimers };
    }

    case 'RESET_TIMER': {
      const resetTimers = state.timers.map(t =>
        t.id === action.payload
          ? { ...t, remaining: t.duration, status: 'idle', halfwayAlertTriggered: false }
          : t
      );
      saveTimers(resetTimers);
      return { ...state, timers: resetTimers };
    }

    case 'ADD_HISTORY': {
      const newHistory = [...state.history, action.payload];
      saveHistory(newHistory);
      return { ...state, history: newHistory };
    }

    case 'TICK': {
      let newTimers = [];
      let completedTimers = [];

      state.timers.forEach(t => {
        if (t.id !== action.payload || t.status !== 'running') {
          newTimers.push(t);
          return;
        }

        const updated = { ...t, remaining: t.remaining - 1 };

        if (
          updated.halfwayAlert &&
          !updated.halfwayAlertTriggered &&
          updated.remaining === Math.floor(updated.duration / 2)
        ) {
          toast.info(`⏰ ${updated.name} is halfway done!`, {
            toastId: `halfway-${updated.id}`,
          });

          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('⏰ Halfway Alert', {
              body: `${updated.name} You are halfway through!`,
            });
          }

          updated.halfwayAlertTriggered = true;
        }

        if (updated.remaining <= 0) {
          toast.success(`${updated.name} completed!`, {
            toastId: `done-${updated.id}`,
          });

          updated.status = 'completed';
          updated.remaining = 0;

          completedTimers.push({
            id: updated.id,
            name: updated.name,
            category: updated.category,
            completedAt: Date.now(),
          });

          return;
        }

        newTimers.push(updated);
      });

      const updatedHistory = [...state.history, ...completedTimers];
      saveTimers(newTimers);
      saveHistory(updatedHistory);

      return {
        ...state,
        timers: newTimers,
        history: updatedHistory,
      };
    }

    default:
      return state;
  }
}

export function TimerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <TimerContext.Provider value={{ state, dispatch }}>
      {children}
    </TimerContext.Provider>
  );
}
