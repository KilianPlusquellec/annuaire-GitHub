import { SortKey } from '../../@types';
import cn from '../../lib/cn';

const OPTIONS: { value: SortKey; label: string }[] = [
  { value: 'stars', label: 'Étoiles' },
  { value: 'forks', label: 'Forks' },
  { value: 'updated', label: 'Récent' },
];

type SortControlProps = {
  value: SortKey;
  onChange: (value: SortKey) => void;
};

/**
 * Contrôle segmenté. L'indicateur est un seul élément qui se déplace en
 * translation : le changement d'onglet se lit comme un déplacement, pas
 * comme deux fondus qui se croisent.
 */
function SortControl({ value, onChange }: SortControlProps) {
  const activeIndex = Math.max(
    0,
    OPTIONS.findIndex((option) => option.value === value)
  );

  return (
    <div
      role="radiogroup"
      aria-label="Trier les résultats"
      className="relative flex w-full max-w-[19rem] rounded-full border border-line/[0.1] bg-shell p-1 sm:w-auto"
    >
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full bg-card shadow-soft transition-transform duration-300 ease-out"
        style={{ transform: `translateX(${activeIndex * 100}%)` }}
      />

      {OPTIONS.map((option) => (
        <button
          key={option.value}
          type="button"
          role="radio"
          aria-checked={option.value === value}
          onClick={() => onChange(option.value)}
          className={cn(
            'relative z-10 flex-1 rounded-full px-4 py-1.5 text-sm transition-colors duration-200 ease-out sm:flex-none',
            option.value === value
              ? 'font-medium text-fg'
              : 'text-fg-3 hover:text-fg-2'
          )}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}

export default SortControl;
