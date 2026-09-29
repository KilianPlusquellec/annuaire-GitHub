import axios from 'axios';

import { ApiData, SortKey } from '../@types';

const SEARCH_URL = 'https://api.github.com/search/repositories';

/** L'API de recherche GitHub plafonne à 1000 résultats paginables. */
export const MAX_RESULTS = 1000;
export const PER_PAGE = 12;

export type SearchParams = {
  query: string;
  page?: number;
  sort?: SortKey;
  perPage?: number;
  signal?: AbortSignal;
};

export async function searchRepos({
  query,
  page = 1,
  sort = 'stars',
  perPage = PER_PAGE,
  signal,
}: SearchParams): Promise<ApiData> {
  const { data } = await axios.get<ApiData>(SEARCH_URL, {
    params: { q: query.trim(), sort, order: 'desc', per_page: perPage, page },
    headers: { Accept: 'application/vnd.github+json' },
    signal,
  });

  return data;
}

/**
 * Traduit une erreur réseau en message affichable. La limite de débit est
 * traitée à part : c'est le cas le plus fréquent sans jeton d'API, et le
 * message générique n'aide pas l'utilisateur à savoir quoi faire.
 */
export function describeError(error: unknown): {
  header: string;
  content: string;
} {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status;
    const reason = String(
      (error.response?.data as { message?: string } | undefined)?.message ?? ''
    );

    if (
      status === 403 ||
      status === 429 ||
      reason.toLowerCase().includes('rate limit')
    ) {
      return {
        header: 'Trop de recherches',
        content:
          "L'API GitHub limite les recherches anonymes à dix par minute. Réessayez dans une minute.",
      };
    }

    if (status === 422) {
      return {
        header: 'Recherche refusée',
        content:
          "L'API n'a pas compris cette requête. Essayez des mots-clés plus simples.",
      };
    }

    if (status && status >= 500) {
      return {
        header: 'GitHub ne répond pas',
        content:
          "L'API GitHub est momentanément indisponible. Réessayez dans quelques instants.",
      };
    }

    return {
      header: 'Connexion impossible',
      content:
        "La requête vers l'API GitHub a échoué. Vérifiez votre connexion et réessayez.",
    };
  }

  return {
    header: 'Erreur inattendue',
    content:
      'Une erreur inconnue est survenue. Réessayez dans quelques instants.',
  };
}
