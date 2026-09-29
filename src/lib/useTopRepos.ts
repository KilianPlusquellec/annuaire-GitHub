import axios from 'axios';
import { useEffect, useState } from 'react';

import { Repo } from '../@types';
import { searchRepos } from './github';

/** Seuil de la requête vitrine, réutilisé dans le texte de la page. */
export const STARS_THRESHOLD = 1000;

type TopRepos = {
  repos: Repo[];
  /** Nombre réel de dépôts au-dessus du seuil, renvoyé par l'API. */
  total: number | null;
  state: 'loading' | 'ready' | 'error';
};

/**
 * Une seule requête alimente toute la page d'accueil : les fiches de
 * l'aperçu et le compteur de la grille. Rien n'est inventé, tout vient
 * de l'API au chargement.
 */
export function useTopRepos(count = 6): TopRepos {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [total, setTotal] = useState<number | null>(null);
  const [state, setState] = useState<TopRepos['state']>('loading');

  useEffect(() => {
    const controller = new AbortController();

    searchRepos({
      query: `stars:>${STARS_THRESHOLD}`,
      perPage: count,
      sort: 'stars',
      signal: controller.signal,
    })
      .then((data) => {
        setRepos(data.items);
        setTotal(data.total_count);
        setState('ready');
      })
      .catch((error) => {
        if (axios.isCancel(error)) return;
        setState('error');
      });

    return () => controller.abort();
  }, [count]);

  return { repos, total, state };
}
