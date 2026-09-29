import cn from '../../lib/cn';

function Bar({ className }: { className: string }) {
  return (
    <span
      className={cn(
        'relative block overflow-hidden rounded-full bg-line/[0.07]',
        className
      )}
    >
      <span className="absolute inset-0 animate-shimmer bg-gradient-to-r from-transparent via-line/[0.06] to-transparent" />
    </span>
  );
}

/**
 * Le squelette reprend exactement la géométrie de RepoCard : pas de saut de
 * mise en page quand les vraies fiches arrivent.
 */
function RepoCardSkeleton({ compact = false }: { compact?: boolean }) {
  return (
    <div
      className={cn('core flex flex-col', compact ? 'p-4' : 'p-5')}
      aria-hidden="true"
    >
      <div className="flex items-center gap-2.5">
        <Bar
          className={cn(
            'shrink-0 rounded-full',
            compact ? 'h-7 w-7' : 'h-8 w-8'
          )}
        />
        <Bar className="h-3 w-24" />
      </div>

      <Bar className={cn('h-4 w-2/3', compact ? 'mt-3.5' : 'mt-4')} />

      {!compact && (
        <>
          <Bar className="mt-3 h-3 w-full" />
          <Bar className="mt-2 h-3 w-4/5" />
        </>
      )}

      <div className={cn('mt-auto flex gap-4', compact ? 'pt-4' : 'pt-5')}>
        <Bar className="h-3 w-12" />
        <Bar className="h-3 w-12" />
        <Bar className="h-3 w-16" />
      </div>
    </div>
  );
}

export default RepoCardSkeleton;
