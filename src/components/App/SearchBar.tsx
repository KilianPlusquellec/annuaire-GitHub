import { useState } from 'react';
import { Form, FormField, Input, Segment } from 'semantic-ui-react';

/*
  **Disclaimer**

  dans le cas présent, je n'ai pas besoin de contrôler mon champ
  → https://github.com/O-clock-Onigiri/Spe-React-RECAP/raw/main/E05/ressources/form_control_or_not_control.png

  Je le fais à but pédagogique…
*/
type SearchBarProps = {
  doQuery: (search: string) => void;
};

function SearchBar({ doQuery }: SearchBarProps) {
  const [search, setSearch] = useState('');

  const handleSubmit = () => {
    doQuery(search);
  };

  return (
    <Segment>
      <Form role="search" onSubmit={handleSubmit}>
        <FormField>
          <Input
            icon="search"
            iconPosition="left"
            placeholder="Rechercher un dépôt…"
            aria-label="Rechercher un dépôt"
            role="searchbox"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FormField>
      </Form>
    </Segment>
  );
}

export default SearchBar;
