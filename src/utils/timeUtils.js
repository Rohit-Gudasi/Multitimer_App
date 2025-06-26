export const formatTime = sec => {
  const m = Math.floor(sec / 60).toString().padStart(2, '0');
  const s = (sec % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
};
export const generateId = () => '_' + Math.random().toString(36).substr(2, 9);
