import { useMemo, useState, useCallback } from 'react';
import { BookingContext } from './bookingStore';
import {
  suites,
  privileges,
  addablePrivileges,
  offsetDays,
  nightsBetween,
  suiteStatus,
} from '../data/building';



// A concept should land on its best state, so the search arrives pre-filled.
const DEFAULTS = {
  checkIn: offsetDays(7),
  checkOut: offsetDays(11),
  guests: 2,
};

export function BookingProvider({ children }) {
  const [search, setSearch] = useState(DEFAULTS);
  const [suiteId, setSuiteId] = useState(null);
  const [privilegeIds, setPrivilegeIds] = useState([]);

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

  const selectSuite = useCallback((id) => {
    setSuiteId((prev) => (prev === id ? null : id));
  }, []);

  const togglePrivilege = useCallback((id) => {
    setPrivilegeIds((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id],
    );
  }, []);

  const clearStay = useCallback(() => {
    setSuiteId(null);
    setPrivilegeIds([]);
  }, []);

  const value = useMemo(() => {
    const suite = suites.find((s) => s.id === suiteId) ?? null;
    const chosen = addablePrivileges.filter((p) => privilegeIds.includes(p.id));

    const roomTotal = suite ? suite.price * nights : 0;
    const privilegeTotal = chosen.reduce((sum, p) => sum + (p.price ?? 0), 0);

    const results = suites
      .map((s) => ({ suite: s, status: suiteStatus(s, { ...search, guests: search.guests }) }))
      .sort((a, b) => Number(b.status.ok) - Number(a.status.ok) || b.suite.floor - a.suite.floor);

    return {
      ...search,
      nights,
      setField,
      results,
      availableCount: results.filter((r) => r.status.ok).length,
      suite,
      suiteId,
      selectSuite,
      privileges,
      chosenPrivileges: chosen,
      privilegeIds,
      togglePrivilege,
      clearStay,
      roomTotal,
      privilegeTotal,
      grandTotal: roomTotal + privilegeTotal,
    };
  }, [search, nights, suiteId, privilegeIds, setField, selectSuite, togglePrivilege, clearStay]);

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

function addOneDay(value) {
  const d = new Date(`${value}T00:00`);
  d.setDate(d.getDate() + 1);
  const pad = (n) => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
}

