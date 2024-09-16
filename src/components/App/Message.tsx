import { Icon, Message as MessageSemanticUI } from 'semantic-ui-react';
import { MessageProps } from '../../@types';

/*
  Objectif : créer un composant ultra-configurable
  basé sur React Semantic UI

  Fonctionnalités : un message pourra être défini par

  - un statut = type de message (succès, erreur…)
  - un titre (ou non)
  - une icône (ou non)
  - un contenu

  Exemple :

  message = {
    content: 'Recherchez un dépôt Github ci-dessus',
  }

  message = {
    content: `La recherche a donné 123456 résultats`,
    header: 'Succès',
    icon: {
      name: 'check',
    },
    status: 'success',
  }

  Étapes :
  - je mets mes props désirées
  - je les type
  - je les utilise (avec des conditions pour les optionnelles)
  - j'appelle mon composant à plusieurs endroits de mon application
*/

function Message({ content, icon, header, status }: MessageProps) {
  console.log(content, icon, header, status);

  /*
    pour le status,
    selon la doc de React SemanticUI
    (https://react.semantic-ui.com/collections/message/#variations-info et suivante)
    on peut ajouter `info`, `warning`, `success`, `error` (raccourci de `info={true}`)
    pour modifier la couleur du message

    plusieurs solutions, on décrit chaque cas, exemple :

    ```js
    <MessageSemanticUI
      info={false}
      warning={false}
      success={true}
      error={false}
    >
      Mon contenu
    </MessageSemanticUI>
    ```
    → sera en vert

    Avec des variables = notre prop `status`
    ```js
    <MessageSemanticUI
      info={status === 'info'}
      warning={status === 'warning'}
      success={status === 'success'}
      error={status === 'error'}
    >
      Mon contenu
    </MessageSemanticUI>
    ```
    → si `status === 'success'`, les autres seront à `false`
    → on affiche en vert

    MAIS c'est pas très beau !

    on réfléchit à comment refactoriser tout ça :

    quand on donne en prop, par exemple, `status: 'success'`,
    on veut obtenir `success={true}`
    quand on donne en prop, par exemple, `status: 'error'`,
    on veut obtenir `error={true}`
    
    → la valeur de notre prop, devient donc le nom de la prop de <MessageSemanticUI>
    (avec `true` comme valeur)

    pour faire en « mode automatique », on passe par un objet auquel on calculera
    la propriété = _computed property_

    const msgStatus = {
      [status]: true, // on remplace `[status]` par la valeur de `status` !!!
    }

    et on doit faire ça seulement si on a un `status`
  */
  const msgStatus = !!status && {
    [status]: true,
  };
  // maintenant que j'ai un objet, je peux lui donner en tant que props

  return (
    // Pour ajouter une icône à mon message, j'ai 2 choses à faire :
    //   - ajouter la prop `icon={true}`
    //   - ajouter l'élément <Icon />
    // > https://react.semantic-ui.com/collections/message/#types-icon

    // je vais transformer la valeur de `icon` en booléen :
    //   - si c'est un objet, ça me renvoie `true` → je l'affiche
    //   - si c'est `null`, ça me renvoie `false` → je n'en ai pas
    // pour transformer un type en sa valeur booléenne correspondante,
    // j'utilise le double NOT logical (!)
    //
    // icon  = {……} → !icon = false → !!icon = !false = true
    // icpon = null → !icon = true  → !!icon = !true  = false
    <MessageSemanticUI icon={!!icon} {...msgStatus}>
      {icon && (
        // chaque propriété de icon devient un attribut JSX
        <Icon {...icon} />
      )}

      <MessageSemanticUI.Content>
        {/* si `header` est défini et non nul, je l'affiche */}
        {header && (
          <MessageSemanticUI.Header>{header}</MessageSemanticUI.Header>
        )}

        {content}
      </MessageSemanticUI.Content>
    </MessageSemanticUI>
  );
}

// Valeur par défaut de mes props
// → plusieurs stratégies :
// https://github.com/jsx-eslint/eslint-plugin-react/blob/master/docs/rules/require-default-props.md
Message.defaultProps = {
  icon: null,
  header: null,
  status: null,
};

export default Message;
