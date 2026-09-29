export type Repo = {
  id: number;
  name: string;
  full_name: string;
  owner: {
    login: string;
    avatar_url: string;
    html_url: string;
  };
  html_url: string;
  description: string | null;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  topics?: string[];
};

// Conservé pour compatibilité avec l'ancien nommage du projet.
export type Repos = Repo;

export type ApiData = {
  total_count: number;
  incomplete_results: boolean;
  items: Repo[];
};

export type SortKey = 'stars' | 'forks' | 'updated';

export type SearchStatus =
  | 'idle'
  | 'loading'
  | 'loading-more'
  | 'success'
  | 'empty'
  | 'error';

export type MessageProps = {
  content: string;
  header?: string | null;
  status?: 'info' | 'warning' | 'error' | 'success' | null;
};
