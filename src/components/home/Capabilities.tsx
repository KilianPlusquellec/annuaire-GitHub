import { ArrowSquareOut } from '@phosphor-icons/react';

import { Repo } from '../../@types';
import { formatFull } from '../../lib/format';
import { STARS_THRESHOLD } from '../../lib/useTopRepos';
import Reveal from '../ui/Reveal';

type CapabilitiesProps = {
  repos: Repo[];
  total: number | null;
  state: 'loading' | 'ready' | 'error';
};

type LiveCountProps = {
  total: number | null;
  state: CapabilitiesProps['state'];
};

/** Compteur réel renvoyé par l'API. Aucun chiffre de remplissage. */
function LiveCount({ total, state }: LiveCountProps) {
  if (state === 'error' || total === null) {
    return (
      <p className="text-sm leading-relaxed text-fg-3">
        Le compteur en direct est indisponible pour le moment.
      </p>
    );
  }

  if (state === 'loading') {
    return (
      <span
        aria-hidden="true"
        className="relative block h-11 w-52 overflow-hidden rounded-full bg-line/[0.07] sm:h-12"
      >
        <span className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-line/[0.06] to-transparent" />
      </span>
    );
  }

  return (
    <>
      <p className="font-mono text-4xl font-medium tracking-tight text-accent-fg sm:text-5xl">
        {formatFull(total)}
      </p>
      <p className="mt-2 text-sm text-fg-3">
        dépôts dépassent {formatFull(STARS_THRESHOLD)} étoiles, à cet instant.
      </p>
    </>
  );
}

function Capabilities({ repos, total, state }: CapabilitiesProps) {
  return (
    <Reveal as="section" className="mx-auto w-full max-w-6xl px-4 pb-24">
      <h2 className="max-w-lg text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        Ce que fait l&apos;annuaire
      </h2>
      <p className="mt-3 max-w-lg text-fg-2 text-pretty">
        Trois choses, et rien de plus : une recherche, un classement, un lien.
      </p>

      <div className="mt-10 grid gap-4 lg:grid-cols-12 lg:grid-rows-2">
        <article className="core relative flex flex-col justify-between overflow-hidden p-7 lg:col-span-7 lg:row-span-2">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(120%_95%_at_0%_0%,rgb(var(--accent)/0.16),transparent_62%)]"
          />

          <div className="relative">
            <h3 className="text-xl font-semibold tracking-tight">
              Classé par étoiles
            </h3>
            <p className="mt-3 max-w-sm leading-relaxed text-fg-2 text-pretty">
              Les résultats suivent le nombre d&apos;étoiles renvoyé par
              l&apos;API, pas un classement maison. Vous pouvez aussi trier par
              forks ou par date de mise à jour.
            </p>
          </div>

          <div className="relative mt-10 lg:mt-16">
            <LiveCount total={total} state={state} />
          </div>
        </article>

        <article className="core flex flex-col justify-between gap-8 p-7 lg:col-span-5">
          <div>
            <h3 className="text-xl font-semibold tracking-tight">
              Les données viennent de GitHub
            </h3>
            <p className="mt-3 leading-relaxed text-fg-2 text-pretty">
              Propriétaire, description, étoiles, forks : chaque fiche affiche
              ce que renvoie l&apos;API publique, sans copie intermédiaire.
            </p>
          </div>

          <div className="flex -space-x-2.5">
            {state === 'ready'
              ? repos
                  .slice(0, 6)
                  .map((repo) => (
                    <img
                      key={repo.id}
                      src={repo.owner.avatar_url}
                      alt={repo.owner.login}
                      title={repo.owner.login}
                      width={36}
                      height={36}
                      loading="lazy"
                      className="h-9 w-9 rounded-full bg-shell ring-2 ring-card"
                    />
                  ))
              : Array.from({ length: 6 }, (_, index) => (
                  <span
                    key={index}
                    aria-hidden="true"
                    className="h-9 w-9 rounded-full bg-line/[0.07] ring-2 ring-card"
                  />
                ))}
          </div>
        </article>

        <article className="core relative flex flex-col justify-between gap-8 overflow-hidden p-7 lg:col-span-5">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 bg-[linear-gradient(145deg,rgb(var(--line)/0.07),transparent_55%)]"
          />

          <div className="relative">
            <h3 className="text-xl font-semibold tracking-tight">
              Un clic, le dépôt
            </h3>
            <p className="mt-3 leading-relaxed text-fg-2 text-pretty">
              La fiche entière est cliquable et ouvre le dépôt sur GitHub, dans
              un nouvel onglet.
            </p>
          </div>

          <ArrowSquareOut
            size={40}
            weight="light"
            aria-hidden="true"
            className="relative text-fg-3"
          />
        </article>
      </div>
    </Reveal>
  );
}

export default Capabilities;
