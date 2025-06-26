export const loadTimers = () => {
  const t = localStorage.getItem('timers');
  return t ? JSON.parse(t) : [];
};

export const saveTimers = (timers) => {
  localStorage.setItem('timers', JSON.stringify(timers));
};

export const loadHistory = () => {
  const h = localStorage.getItem('history');
  return h ? JSON.parse(h) : [];
};

export const saveHistory = (history) => {
  localStorage.setItem('history', JSON.stringify(history));
};
