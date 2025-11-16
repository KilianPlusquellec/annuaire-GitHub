import { useState } from 'react';

/*
  **Disclaimer**

  dans le cas présent, je n'ai pas besoin de contrôler mon champ
  → https://github.com/O-clock-Onigiri/Spe-React-RECAP/raw/main/E05/ressources/form_control_or_not_control.png

  Je le fais à but pédagogique…
*/
type SearchBarProps = {
  doQuery: (search: string) => void;
};

function SearchBar({ doQuery }: SearchBarProps) {
  const [search, setSearch] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    doQuery(search);
  };

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className="flex justify-center mb-8"
    >
      <div className="relative w-full max-w-2xl">
        <input
          type="text"
          placeholder="Rechercher des dépôts GitHub..."
          aria-label="Rechercher un dépôt"
          role="searchbox"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-12 pr-6 py-4 text-lg border-2 border-secondary-200 rounded-2xl focus:outline-none focus:ring-4 focus:ring-primary-500/20 focus:border-primary-500 bg-white shadow-soft hover:shadow-medium transition-all duration-300 font-medium placeholder-secondary-400"
        />
        <svg
          className="absolute left-4 top-1/2 transform -translate-y-1/2 w-6 h-6 text-secondary-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2 rounded-xl font-semibold transition-colors duration-200 shadow-soft hover:shadow-medium"
        >
          Rechercher
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
