const compact = new Intl.NumberFormat('fr-FR', {
  notation: 'compact',
  maximumFractionDigits: 1,
});

const full = new Intl.NumberFormat('fr-FR');

/** 412812 → « 412,8 k ». Pour les chiffres affichés dans les fiches. */
export function formatCount(value: number): string {
  return compact.format(value);
}

/** 412812 → « 412 812 ». Pour les totaux, où la précision compte. */
export function formatFull(value: number): string {
  return full.format(value);
}

const relative = new Intl.RelativeTimeFormat('fr-FR', { numeric: 'auto' });

const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
  ['year', 365 * 24 * 3600],
  ['month', 30 * 24 * 3600],
  ['week', 7 * 24 * 3600],
  ['day', 24 * 3600],
  ['hour', 3600],
  ['minute', 60],
];

/** « il y a 3 jours », à partir d'une date ISO renvoyée par l'API. */
export function formatRelative(iso: string): string {
  const seconds = (Date.now() - new Date(iso).getTime()) / 1000;

  const match = UNITS.find(([, size]) => seconds >= size);

  if (!match) {
    return relative.format(-Math.floor(seconds), 'second');
  }

  const [unit, size] = match;
  return relative.format(-Math.floor(seconds / size), unit);
}
