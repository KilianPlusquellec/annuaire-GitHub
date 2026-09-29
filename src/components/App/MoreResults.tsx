import { ArrowDown, CircleNotch } from '@phosphor-icons/react';

import Button, { ButtonIcon } from '../ui/Button';

type MoreResultsProps = {
  nextPage: () => void;
  loading?: boolean;
  remaining: number;
};

function MoreResults({
  nextPage,
  loading = false,
  remaining,
}: MoreResultsProps) {
  return (
    <div className="mt-10 flex flex-col items-center gap-3">
      <Button
        variant="secondary"
        size="lg"
        onClick={nextPage}
        disabled={loading}
      >
        {loading ? 'Chargement' : 'Charger la suite'}
        <ButtonIcon tone="on-surface">
          {loading ? (
            <CircleNotch size={16} weight="bold" className="animate-spin" />
          ) : (
            <ArrowDown size={16} weight="bold" />
          )}
        </ButtonIcon>
      </Button>

      <p className="font-mono text-xs text-fg-3">
        {remaining} résultats restants
      </p>
    </div>
  );
}

export default MoreResults;
