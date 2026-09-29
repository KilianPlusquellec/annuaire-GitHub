import { Repo } from '../../@types';
import { PER_PAGE } from '../../lib/github';
import RepoCard from '../repo/RepoCard';
import RepoCardSkeleton from '../repo/RepoCardSkeleton';

type ReposResultsProps = {
  list: Repo[];
  /** Première page en cours : on montre des squelettes, pas un spinner. */
  loading?: boolean;
  loadingMore?: boolean;
};

const GRID = 'grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3';

function ReposResults({
  list,
  loading = false,
  loadingMore = false,
}: ReposResultsProps) {
  if (loading) {
    return (
      <div
        className={GRID}
        aria-busy="true"
        aria-label="Chargement des résultats"
      >
        {Array.from({ length: 6 }, (_, index) => (
          <RepoCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  return (
    <section className={GRID}>
      {list.map((repo, index) => (
        <RepoCard key={repo.id} repo={repo} index={index % PER_PAGE} />
      ))}

      {loadingMore &&
        Array.from({ length: 3 }, (_, index) => (
          <RepoCardSkeleton key={`more-${index}`} />
        ))}
    </section>
  );
}

export default ReposResults;
