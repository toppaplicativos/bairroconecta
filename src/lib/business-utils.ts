import { Business } from './data';

const normalize = (s: string) =>
  s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').trim();

const ptDayIndex: Record<string, number> = {
  domingo: 0, dom: 0,
  segunda: 1, seg: 1,
  terca: 2, ter: 2,
  quarta: 3, qua: 3,
  quinta: 4, qui: 4,
  sexta: 5, sex: 5,
  sabado: 6, sab: 6,
};

function parseDayIndex(name: string): number | null {
  const n = normalize(name);
  for (const [key, val] of Object.entries(ptDayIndex)) {
    if (n.startsWith(key.substring(0, 3))) return val;
  }
  return null;
}

function getDaysInRange(dayStr: string): number[] {
  const lower = normalize(dayStr);
  if (lower.includes('todos')) return [0, 1, 2, 3, 4, 5, 6];

  if (lower.includes(' a ')) {
    const [startPart, endPart] = lower.split(' a ');
    const start = parseDayIndex(startPart);
    const end = parseDayIndex(endPart);
    if (start !== null && end !== null) {
      const days: number[] = [];
      if (start <= end) {
        for (let d = start; d <= end; d++) days.push(d);
      } else {
        for (let d = start; d <= 6; d++) days.push(d);
        for (let d = 0; d <= end; d++) days.push(d);
      }
      return days;
    }
  }

  const single = parseDayIndex(dayStr);
  return single !== null ? [single] : [];
}

export type OpenStatus = {
  isOpen: boolean;
  label: string;
  closesAt?: string;
  opensAt?: string;
};

export function getOpenStatus(business: Business): OpenStatus {
  if (!business.hours?.length) return { isOpen: false, label: 'Horário não disponível' };

  const now = new Date();
  const today = now.getDay();
  const nowMins = now.getHours() * 60 + now.getMinutes();

  for (const slot of business.hours) {
    const days = getDaysInRange(slot.day);
    if (!days.includes(today)) continue;

    const parts = slot.time.split(' - ');
    if (parts.length !== 2) continue;

    const [oh, om] = parts[0].trim().split(':').map(Number);
    const [ch, cm] = parts[1].trim().split(':').map(Number);
    const openMins = oh * 60 + om;
    const closeMins = ch * 60 + cm;

    if (nowMins >= openMins && nowMins < closeMins) {
      return { isOpen: true, label: `Aberto · Fecha às ${parts[1].trim()}`, closesAt: parts[1].trim() };
    }
    if (nowMins < openMins) {
      return { isOpen: false, label: `Abre às ${parts[0].trim()}`, opensAt: parts[0].trim() };
    }
  }

  return { isOpen: false, label: 'Fechado hoje' };
}
