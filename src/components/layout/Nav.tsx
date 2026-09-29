import { GithubLogo } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { SEARCH_CTA, SEARCH_PATH } from '../../lib/links';
import { ButtonIcon } from '../ui/Button';
import buttonStyles from '../ui/buttonStyles';
import ThemeToggle from '../ui/ThemeToggle';

type NavProps = {
  /** « landing » affiche l'action principale, « app » ne la répète pas. */
  variant?: 'landing' | 'app';
};

function Nav({ variant = 'landing' }: NavProps) {
  return (
    <header className="sticky top-[calc(0.75rem+env(safe-area-inset-top))] z-30 px-4 sm:top-[calc(1.25rem+env(safe-area-inset-top))]">
      <nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-4 rounded-full border border-line/[0.1] bg-card/70 pl-5 pr-2 shadow-soft backdrop-blur-xl">
        <Link
          to="/"
          className="flex items-center gap-2.5 rounded-full text-[0.95rem] font-semibold tracking-tight"
        >
          <GithubLogo size={22} weight="fill" className="text-fg" />
          <span>
            Annuaire
            <span className="ml-1.5 font-normal text-fg-3">GitHub</span>
          </span>
        </Link>

        <div className="flex items-center gap-1">
          <ThemeToggle />

          {variant === 'landing' && (
            <Link
              to={SEARCH_PATH}
              className={`${buttonStyles('primary', 'md')} hidden pl-5 pr-1.5 sm:inline-flex`}
            >
              {SEARCH_CTA}
              <ButtonIcon />
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Nav;
