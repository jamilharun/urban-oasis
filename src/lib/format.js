// Dates and money. No knowledge of the building — just formatting, so it can
// be read and changed without scrolling past 600 lines of content.

const pad = (n) => String(n).padStart(2, '0');
const iso = (d) => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;

export const todayISO = iso(new Date());

/** ISO date `n` days from today, in local time. */
export function offsetDays(n) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return iso(d);
}

export function nightsBetween(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const ms = new Date(`${checkOut}T00:00`) - new Date(`${checkIn}T00:00`);
  return Math.max(0, Math.round(ms / 86400000));
}

export function formatDate(value) {
  if (!value) return '—';
  return new Date(`${value}T00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export const currency = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
