import { MagnifyingGlass, WarningCircle } from '@phosphor-icons/react';
import { useEffect, useRef, useState } from 'react';

import cn from '../../lib/cn';

type SearchBarProps = {
  defaultValue?: string;
  busy?: boolean;
  onSearch: (search: string) => void;
};

function SearchBar({
  defaultValue = '',
  busy = false,
  onSearch,
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // La recherche peut changer depuis l'URL (suggestion, retour arrière) :
  // le champ suit, sans perdre le focus.
  useEffect(() => {
    setValue(defaultValue);
  }, [defaultValue]);

  // Raccourci « / » pour revenir au champ. Geste répété : aucune animation.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== '/' || event.metaKey || event.ctrlKey || event.altKey)
        return;

      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable)
        return;

      event.preventDefault();
      inputRef.current?.focus();
      inputRef.current?.select();
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!value.trim()) {
      setError('Saisissez au moins un mot-clé avant de lancer la recherche.');
      inputRef.current?.focus();
      return;
    }

    setError(null);
    onSearch(value.trim());
  };

  return (
    <form role="search" onSubmit={handleSubmit} className="w-full">
      <label
        htmlFor="repo-search"
        className="mb-2 block text-sm font-medium text-fg-2"
      >
        Mots-clés
      </label>

      <div
        className={cn(
          'shell flex items-center gap-1.5 transition-[border-color,box-shadow] duration-200 ease-out',
          'focus-within:border-accent-fg/40 focus-within:shadow-lift',
          error && 'border-danger/40'
        )}
      >
        <div className="core flex min-w-0 flex-1 items-center gap-2.5 px-4">
          <MagnifyingGlass
            size={20}
            weight="light"
            aria-hidden="true"
            className="shrink-0 text-fg-3"
          />

          <input
            id="repo-search"
            ref={inputRef}
            type="search"
            name="q"
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
              if (error) setError(null);
            }}
            placeholder="react, tailwind, language:rust…"
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="none"
            spellCheck={false}
            enterKeyHint="search"
            aria-describedby={error ? 'repo-search-error' : 'repo-search-hint'}
            aria-invalid={error ? true : undefined}
            className="h-12 min-w-0 flex-1 bg-transparent text-base text-fg outline-none placeholder:text-fg-3"
          />
        </div>

        <button
          type="submit"
          disabled={busy}
          className="h-12 shrink-0 rounded-core bg-accent px-5 text-sm font-medium text-accent-ink transition-[transform,filter] duration-200 ease-out hover:brightness-110 active:scale-[0.97] disabled:pointer-events-none disabled:opacity-60"
        >
          Rechercher
        </button>
      </div>

      {error ? (
        <p
          id="repo-search-error"
          role="alert"
          className="mt-2 flex items-center gap-1.5 text-sm text-danger"
        >
          <WarningCircle size={15} weight="light" aria-hidden="true" />
          {error}
        </p>
      ) : (
        <p id="repo-search-hint" className="mt-2 text-sm text-fg-3">
          Appuyez sur{' '}
          <kbd className="rounded border border-line/[0.14] bg-card px-1.5 py-0.5 font-mono text-[0.7rem] text-fg-2">
            /
          </kbd>{' '}
          pour revenir au champ.
        </p>
      )}
    </form>
  );
}

export default SearchBar;
