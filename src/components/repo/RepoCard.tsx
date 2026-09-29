import { GitFork, Star } from '@phosphor-icons/react';

import { Repo } from '../../@types';
import cn from '../../lib/cn';
import { formatCount, formatRelative } from '../../lib/format';

type RepoCardProps = {
  repo: Repo;
  /** Position dans la liste : sert uniquement au décalage d'apparition. */
  index?: number;
  compact?: boolean;
};

function RepoCard({ repo, index = 0, compact = false }: RepoCardProps) {
  return (
    <article
      data-enter
      style={{ animationDelay: `${Math.min(index, 7) * 45}ms` }}
      className={cn(
        'group core relative flex animate-enter flex-col',
        compact ? 'p-4' : 'p-5',
        'transition-[transform,box-shadow,border-color] duration-300 ease-out',
        'hover:-translate-y-0.5 hover:border-line/[0.14] hover:shadow-lift'
      )}
    >
      <div className="flex items-center gap-2.5">
        <img
          src={repo.owner.avatar_url}
          alt=""
          loading="lazy"
          width={compact ? 28 : 32}
          height={compact ? 28 : 32}
          className={cn(
            'rounded-full bg-shell ring-1 ring-line/10',
            compact ? 'h-7 w-7' : 'h-8 w-8'
          )}
        />
        <a
          href={repo.owner.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 truncate text-sm text-fg-2 transition-colors duration-200 hover:text-fg"
        >
          {repo.owner.login}
        </a>

        {!compact && (
          <span className="ml-auto shrink-0 font-mono text-xs text-fg-3">
            {formatRelative(repo.updated_at)}
          </span>
        )}
      </div>

      <h3
        className={cn(
          'mt-3 font-semibold tracking-tight text-balance',
          compact ? 'text-base' : 'text-lg'
        )}
      >
        {/* Lien étiré : toute la fiche est cliquable, le lien reste unique. */}
        <a
          href={repo.html_url}
          target="_blank"
          rel="noopener noreferrer"
          className="after:absolute after:inset-0 after:rounded-core after:content-['']"
        >
          {repo.name}
        </a>
      </h3>

      {!compact && (
        <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-fg-2 text-pretty">
          {repo.description ?? 'Ce dépôt ne fournit pas de description.'}
        </p>
      )}

      <div
        className={cn(
          'mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 pt-4 font-mono text-xs text-fg-3',
          compact && 'pt-3'
        )}
      >
        <span className="inline-flex items-center gap-1.5 text-accent-fg">
          <Star size={14} weight="fill" />
          {formatCount(repo.stargazers_count)}
        </span>

        <span className="inline-flex items-center gap-1.5">
          <GitFork size={14} weight="regular" />
          {formatCount(repo.forks_count)}
        </span>

        {repo.language && <span className="truncate">{repo.language}</span>}
      </div>
    </article>
  );
}

export default RepoCard;
