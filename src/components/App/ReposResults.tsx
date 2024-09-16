import { CardGroup } from 'semantic-ui-react';
import { Repos } from '../../@types';

type ReposResultsProps = {
  list: Repos[];
};

function ReposResults({ list }: ReposResultsProps) {
  const items = list.map((item) => ({
    key: item.id,
    as: 'article',
    image: item.owner.avatar_url,
    header: {
      as: 'h2',
      content: <a href={item.html_url} target="_blank" rel="noopener noreferrer">{item.name}</a>,
    },
    meta: item.owner.login,
    description: {
      as: 'p',
      content: item.description,
    },
  }));

  return <CardGroup as="section" items={items} itemsPerRow={3} stackable />;
}

export default ReposResults;