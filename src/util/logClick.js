// J.M.J.

export function logClick(name) {
  fetch(`/api/log_click?name=${encodeURIComponent(name)}`, {
    method: 'POST',
  }).catch((error) => console.error('Failed to log click:', error));
}