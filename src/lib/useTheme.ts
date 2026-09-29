import { useCallback, useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

function currentTheme(): Theme {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

/**
 * Le thème est déjà posé sur <html> par le script d'amorçage de index.html.
 * Ce hook se contente de le lire et de le basculer, ce qui évite tout flash.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>(currentTheme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;

    try {
      localStorage.setItem('theme', theme);
    } catch {
      // Navigation privée ou stockage bloqué : le thème reste valable pour la session.
    }
  }, [theme]);

  const toggle = useCallback(() => {
    setTheme((current) => (current === 'dark' ? 'light' : 'dark'));
  }, []);

  return { theme, toggle };
}
