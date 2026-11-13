/** Months are counted as year * 12 + zero-based month so ranges are plain integers. */
export function monthIndex(date: string, now: number): number {
  if (date === "present") return now;
  const m = /^(\d{4})\.(\d{2})$/.exec(date);
  if (!m) throw new Error(`Invalid date "${date}": expected YYYY.MM or "present"`);
  return Number(m[1]) * 12 + Number(m[2]) - 1;
}

export function monthLabel(index: number): string {
  return `${Math.floor(index / 12)}.${String((index % 12) + 1).padStart(2, "0")}`;
}

export function monthsBetween(from: string, to: string, now: number): number {
  return monthIndex(to, now) - monthIndex(from, now) + 1;
}

export function currentMonth(d = new Date()): number {
  return d.getFullYear() * 12 + d.getMonth();
}

export type Uptime = { y: number; m: number; d: number; clock: string };

/** Adds whole months, clamping the day to the target month's length (Jan 31 + 1 month = Feb 28/29). */
function addMonths(d: Date, months: number): Date {
  const target = new Date(d.getFullYear(), d.getMonth() + months, 1);
  const lastDay = new Date(target.getFullYear(), target.getMonth() + 1, 0).getDate();
  target.setDate(Math.min(d.getDate(), lastDay));
  return target;
}

export function uptimeSince(start: Date, now: Date): Uptime {
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let months = (now.getFullYear() - start.getFullYear()) * 12 + now.getMonth() - start.getMonth();
  // regression: day-borrow went negative for starts on the 29th–31st
  if (addMonths(start, months) > today) months -= 1;
  const anchor = addMonths(start, months);
  const d = Math.round((today.getTime() - anchor.getTime()) / 86_400_000);
  const clock = [now.getHours(), now.getMinutes(), now.getSeconds()].map((x) => String(x).padStart(2, "0")).join(":");
  return { y: Math.floor(months / 12), m: months % 12, d, clock };
}
