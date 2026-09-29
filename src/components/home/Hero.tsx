import { CodeBlock } from '@phosphor-icons/react';
import { Link } from 'react-router-dom';

import { Repo } from '../../@types';
import { SEARCH_CTA, SEARCH_PATH, SOURCE_URL } from '../../lib/links';
import RepoCard from '../repo/RepoCard';
import RepoCardSkeleton from '../repo/RepoCardSkeleton';
import { ButtonIcon } from '../ui/Button';
import buttonStyles from '../ui/buttonStyles';

type HeroProps = {
  repos: Repo[];
  state: 'loading' | 'ready' | 'error';
};

function Hero({ repos, state }: HeroProps) {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 pb-20 pt-12 sm:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <h1
            className="animate-enter text-[2.75rem] font-semibold leading-[1.05] tracking-[-0.03em] text-balance sm:text-6xl"
            style={{ animationDelay: '40ms' }}
          >
            Tout GitHub,
            <span className="block text-fg-2">en une recherche.</span>
          </h1>

          <p
            className="mt-6 max-w-lg animate-enter text-lg leading-relaxed text-fg-2 text-pretty"
            style={{ animationDelay: '120ms' }}
          >
            Cherchez parmi des millions de dépôts open source, classés par
            étoiles, et ouvrez le bon en deux clics.
          </p>

          <div
            className="mt-9 flex animate-enter flex-wrap items-center gap-3"
            style={{ animationDelay: '200ms' }}
          >
            <Link to={SEARCH_PATH} className={buttonStyles('primary', 'lg')}>
              {SEARCH_CTA}
              <ButtonIcon />
            </Link>

            <a
              href={SOURCE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonStyles('secondary', 'lg')}
            >
              Voir le code source
              <ButtonIcon tone="on-surface">
                <CodeBlock size={16} weight="bold" />
              </ButtonIcon>
            </a>
          </div>
        </div>

        <div
          className="animate-enter lg:col-span-5"
          style={{ animationDelay: '280ms' }}
        >
          {/* Aperçu réel : les mêmes fiches que la page de recherche, avec les
              données renvoyées par l'API au chargement. */}
          <div className="shell">
            <p className="px-3 py-2.5 text-xs text-fg-2">
              Les dépôts les plus étoilés
            </p>

            <div className="flex flex-col gap-1.5">
              {state === 'loading' &&
                Array.from({ length: 3 }, (_, index) => (
                  <RepoCardSkeleton key={index} compact />
                ))}

              {state === 'ready' &&
                repos
                  .slice(0, 3)
                  .map((repo, index) => (
                    <RepoCard key={repo.id} repo={repo} index={index} compact />
                  ))}

              {state === 'error' && (
                <p className="core p-5 text-sm leading-relaxed text-fg-2">
                  L&apos;aperçu en direct n&apos;a pas pu se charger. La
                  recherche, elle, reste disponible.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
