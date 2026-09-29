import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { Repo, SearchStatus, SortKey } from '../../@types';
import { formatFull } from '../../lib/format';
import { MAX_RESULTS, describeError, searchRepos } from '../../lib/github';
import Footer from '../layout/Footer';
import Nav from '../layout/Nav';
import Button from '../ui/Button';
import Message from './Message';
import MoreResults from './MoreResults';
import ReposResults from './ReposResults';
import SearchBar from './SearchBar';
import SortControl from './SortControl';

const SUGGESTIONS = ['react', 'tailwindcss', 'language:rust', 'org:vercel'];

const SORT_KEYS: SortKey[] = ['stars', 'forks', 'updated'];

function App() {
  const [params, setParams] = useSearchParams();
  const query = params.get('q')?.trim() ?? '';
  const sortParam = params.get('sort') as SortKey | null;
  const sort: SortKey =
    sortParam && SORT_KEYS.includes(sortParam) ? sortParam : 'stars';

  const [page, setPage] = useState(1);
  const [items, setItems] = useState<Repo[]>([]);
  const [total, setTotal] = useState(0);
  const [status, setStatus] = useState<SearchStatus>(
    query ? 'loading' : 'idle'
  );
  const [failure, setFailure] = useState({ header: '', content: '' });
  // Incrémenté par « Réessayer » : relance la requête sans changer l'URL.
  const [attempt, setAttempt] = useState(0);

  // Changer de requête ou de tri repart de la page 1. L'ajustement se fait
  // pendant le rendu pour que l'effet de chargement ne parte jamais avec une
  // pagination périmée.
  const searchKey = `${query}|${sort}`;
  const [lastKey, setLastKey] = useState(searchKey);

  if (searchKey !== lastKey) {
    setLastKey(searchKey);
    setPage(1);
  }

  useEffect(() => {
    if (!query) {
      setItems([]);
      setTotal(0);
      setStatus('idle');
      return undefined;
    }

    const controller = new AbortController();
    const isFirstPage = page === 1;

    setStatus(isFirstPage ? 'loading' : 'loading-more');

    searchRepos({ query, page, sort, signal: controller.signal })
      .then((data) => {
        setTotal(data.total_count);
        setItems((current) =>
          isFirstPage ? data.items : [...current, ...data.items]
        );
        setStatus(data.total_count === 0 ? 'empty' : 'success');
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setFailure(describeError(error));
        setStatus('error');
      });

    return () => controller.abort();
  }, [query, page, sort, attempt]);

  const doQuery = useCallback(
    (search: string) => {
      setParams(search ? { q: search, sort } : {});
    },
    [setParams, sort]
  );

  const changeSort = useCallback(
    (next: SortKey) => {
      setParams(query ? { q: query, sort: next } : { sort: next });
    },
    [setParams, query]
  );

  const reachable = Math.min(total, MAX_RESULTS);
  const remaining = Math.max(0, reachable - items.length);
  const hasResults = items.length > 0;

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Nav variant="app" />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 pb-4 pt-12 sm:pt-16">
        <div className="max-w-xl">
          <h1 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            Chercher un dépôt
          </h1>
          <p className="mt-3 text-fg-2 text-pretty">
            Les résultats viennent de l&apos;API de recherche GitHub, dans la
            limite des {formatFull(MAX_RESULTS)} premiers dépôts.
          </p>
        </div>

        <div className="mt-8">
          <SearchBar
            defaultValue={query}
            busy={status === 'loading'}
            onSearch={doQuery}
          />
        </div>

        <div className="mt-12">
          {(hasResults || status === 'loading') && (
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-fg-2" aria-live="polite">
                {status === 'loading' ? (
                  'Recherche en cours…'
                ) : (
                  <>
                    <span className="font-mono text-fg">
                      {formatFull(total)}
                    </span>{' '}
                    dépôts pour
                    <span className="text-fg"> «&nbsp;{query}&nbsp;»</span>
                  </>
                )}
              </p>

              <SortControl value={sort} onChange={changeSort} />
            </div>
          )}

          {status === 'idle' && (
            <Message
              status="info"
              header="Commencez par un mot-clé"
              content="Un nom de bibliothèque, un langage, une organisation. Les quatre exemples ci-dessous fonctionnent tels quels."
            >
              <ul className="flex flex-wrap justify-center gap-2">
                {SUGGESTIONS.map((suggestion) => (
                  <li key={suggestion}>
                    <button
                      type="button"
                      onClick={() => doQuery(suggestion)}
                      className="rounded-full border border-line/[0.12] bg-card px-4 py-1.5 font-mono text-sm text-fg-2 transition-[transform,color,border-color] duration-200 ease-out hover:border-line/25 hover:text-fg active:scale-[0.97]"
                    >
                      {suggestion}
                    </button>
                  </li>
                ))}
              </ul>
            </Message>
          )}

          {status === 'empty' && (
            <Message
              status="warning"
              header="Aucun dépôt ne correspond"
              content={`La recherche \u00ab\u00a0${query}\u00a0\u00bb ne renvoie rien. Essayez un mot-clé plus court ou une autre orthographe.`}
            />
          )}

          {status === 'error' && (
            <Message
              status="error"
              header={failure.header}
              content={failure.content}
            >
              <Button
                variant="secondary"
                onClick={() => setAttempt((current) => current + 1)}
              >
                Réessayer
              </Button>
            </Message>
          )}

          {(hasResults || status === 'loading') && (
            <ReposResults
              list={items}
              loading={status === 'loading'}
              loadingMore={status === 'loading-more'}
            />
          )}

          {hasResults && remaining > 0 && status !== 'loading' && (
            <MoreResults
              nextPage={() => setPage((current) => current + 1)}
              loading={status === 'loading-more'}
              remaining={remaining}
            />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
