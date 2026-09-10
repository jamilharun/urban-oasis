import { useMemo, useState, useCallback } from 'react';
import { BookingContext } from './booking';
import { suites, suiteStatus } from '../data/building';
import { offsetDays, nightsBetween } from '../lib/format';

// A concept should land on its best state, so the search arrives pre-filled.
const DEFAULTS = {
  checkIn: offsetDays(7),
  checkOut: offsetDays(11),
  guests: 2,
};

/**
 * Holds the search only. Which suite you are booking comes from the URL, and
 * the privileges attached to it are local to that suite's page — so a
 * selection can never leak across suites.
 */
export function BookingProvider({ children }) {
  const [search, setSearch] = useState(DEFAULTS);
  const nights = nightsBetween(search.checkIn, search.checkOut);

  const setField = useCallback((field, value) => {
    setSearch((prev) => {
      const next = { ...prev, [field]: value };
      // Check-out can never land on or before check-in.
      if (field === 'checkIn' && next.checkOut && next.checkOut <= value) {
        next.checkOut = addOneDay(value);
      }
      return next;
    });
  }, []);

  const value = useMemo(() => {
    const results = suites
      .map((suite) => ({ suite, status: suiteStatus(suite, search) }))
      .sort((a, b) => Number(b.status.ok) - Number(a.status.ok) || b.suite.floor - a.suite.floor);

    return {
      ...search,
      nights,
      setField,
      results,
      availableCount: results.filter((r) => r.status.ok).length,
    };
  }, [search, nights, setField]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

function addOneDay(value) {
  const d = new Date(`${value}T00:00`);
  d.setDate(d.getDate() + 1);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}
