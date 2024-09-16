// fichier de déclarations des erreurs
export const NO_QUERY = 'NO_QUERY';
export const NO_RESULTS = 'NO_RESULTS';

type Errors = {
  // on prévient qu'on peut avoir « plein » de propriétés
  // différentes… Une seule condition :
  //   - le nom de la propriété doit être un string
  //   - sa valeur aussi
  [property: string]: string;
};

export const errorMessages: Errors = {
  AXIOS_ERROR:
    "Une erreur est survenue au niveau de l'API, merci de recommencer ultérieurement",
  NO_QUERY:
    'Merci de renseigner une recherche avant de soumettre le formulaire',
  NO_RESULTS: "La recherche n'a pas retourné de résultats",
  UNKNOWN_ERROR: 'Erreur inconnue. Merci de recommencer ultérieurement',
};
