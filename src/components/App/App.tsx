import axios from 'axios';
import { useEffect, useState } from 'react';
import { Image } from 'semantic-ui-react';

import Message from './Message';
import MoreResults from './MoreResults';
import ReposResults from './ReposResults';
import SearchBar from './SearchBar';

import { NO_QUERY, NO_RESULTS, errorMessages } from '../../@errors';
import { ApiData, MessageProps } from '../../@types';

import logo from '../../assets/images/GitHub_Logo.png';

import './App.scss';

const API_BASE_URL =
  'https://api.github.com/search/repositories?sort=stars&order=desc';
const PER_PAGE = 3;

function App() {
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ApiData>({
    total_count: 0,
    items: [],
  });

  const [message, setMessage] = useState<MessageProps>({
    content: 'Recherchez un dépôt Github ci-dessus',
  });

  useEffect(() => {
    const fetchRepos = async (search: string) => {
      try {
        if (!search.trim()) {
          throw new Error(NO_QUERY);
        }

        const { data } = await axios.get(
          `${API_BASE_URL}&per_page=${PER_PAGE}&page=${page}&q=${search.trim()}`
        );

        if (!data.total_count) {
          throw new Error(NO_RESULTS);
        }

        setResults((currentResults) => ({
          ...currentResults,
          total_count: data.total_count,
          items: [...currentResults.items, ...data.items],
        }));

        // quand j'ai un résultat, je crée un message
        setMessage({
          content: `La recherche a donné ${data.total_count} résultats`,
          header: 'Succès',
          icon: {
            name: 'check',
          },
          status: 'success',
        });
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // alert(errorMessages.AXIOS_ERROR);
          setMessage({
            content: errorMessages.AXIOS_ERROR,
            header: 'Erreur',
            icon: {
              name: 'cancel',
            },
            status: 'error',
          });
        } else if (error instanceof Error && error.message === NO_RESULTS) {
          setMessage({
            content: errorMessages.NO_RESULTS,
            header: 'Désolé',
            icon: {
              name: 'info',
            },
            status: 'info',
          });
        } else if (error instanceof Error) {
          // alert(errorMessages[error.message]);
          setMessage({
            content: errorMessages[error.message],
            header: 'Erreur',
            icon: {
              name: 'cancel',
            },
            status: 'error',
          });
        } else {
          alert(errorMessages.UNKNOWN_ERROR);
          setMessage({
            content: errorMessages.UNKNOWN_ERROR,
            header: 'Erreur',
            icon: {
              name: 'cancel',
            },
            status: 'error',
          });
        }
      }
    };

    if (query) {
      fetchRepos(query);
    }
  }, [page, query]);

  const nextPage = () => {
    setPage((current) => current + 1);
  };

  const doQuery = (search: string) => {
    setQuery(search);
    setPage(1);
    setResults({
      total_count: 0,
      items: [],
    });
  };

  return (
    <div className="app">
      <header className="header">
        <a href="/"><Image src={logo} size="small" centered /></a>
        <h1>Le meilleur annuaire GitHub</h1>

        <SearchBar doQuery={doQuery} />
      </header>

      <main>
        {/* <Message content={message.content} status={message.status} /> */}
        <Message {...message} />
        <ReposResults list={results.items} />

        {results.total_count > PER_PAGE && <MoreResults nextPage={nextPage} />}
      </main>
    </div>
  );
}

export default App;
