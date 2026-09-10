import { Users, CalendarX2, Moon } from 'lucide-react';

/** suiteStatus() returns a code; this is the glyph for it. Shared by the suite
 *  feed and the reservation page so the two can never disagree. */
export const STATUS_ICON = {
  capacity: Users,
  booked: CalendarX2,
  minstay: Moon,
};
