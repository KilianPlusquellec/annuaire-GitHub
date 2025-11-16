import { IconProps } from 'semantic-ui-react';

export type Repos = {
  id: number;
  name: string;
  owner: {
    login: string;
    avatar_url: string;
  };
  html_url: string;
  description: string | null;
  stargazers_count?: number;
};

export type ApiData = {
  total_count: number;
  items: Repos[];
};

export type MessageProps = {
  content: string;
  header?: string | null;
  status?: 'info' | 'warning' | 'error' | 'success' | null;
  icon?: IconProps | null; // je me sers du typage de React SemanticUI
};
