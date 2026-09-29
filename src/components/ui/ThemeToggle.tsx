import { MoonStars, Sun } from '@phosphor-icons/react';

import { useTheme } from '../../lib/useTheme';

/**
 * Le thème change rarement : une transition de couleur suffit, pas d'animation
 * de rotation ou de morphing qui ralentirait un geste répété.
 */
function ThemeToggle() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark}
      aria-label={isDark ? 'Passer au thème clair' : 'Passer au thème sombre'}
      title={isDark ? 'Thème clair' : 'Thème sombre'}
      className="grid h-9 w-9 place-items-center rounded-full text-fg-2 transition-[color,background-color,transform] duration-200 ease-out hover:bg-line/[0.07] hover:text-fg active:scale-[0.94]"
    >
      {isDark ? (
        <Sun size={18} weight="light" />
      ) : (
        <MoonStars size={18} weight="light" />
      )}
    </button>
  );
}

export default ThemeToggle;
