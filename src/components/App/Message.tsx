import { MessageProps } from '../../@types';

/*
  Objectif : créer un composant ultra-configurable
  basé sur Tailwind CSS

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
*/

function Message({ content, icon, header, status }: MessageProps) {
  const getStatusClasses = () => {
    switch (status) {
      case 'success':
        return 'bg-green-50 border-green-200 text-green-800 shadow-soft';
      case 'error':
        return 'bg-accent-50 border-accent-200 text-accent-800 shadow-soft';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200 text-yellow-800 shadow-soft';
      case 'info':
        return 'bg-primary-50 border-primary-200 text-primary-800 shadow-soft';
      default:
        return 'bg-secondary-50 border-secondary-200 text-secondary-800 shadow-soft';
    }
  };

  const getIcon = () => {
    if (!icon) return null;
    const iconName = icon.name;
    let iconPath = '';
    let iconColor = '';
    switch (iconName) {
      case 'check':
        iconPath = 'M5 13l4 4L19 7';
        iconColor = 'text-green-600';
        break;
      case 'cancel':
        iconPath = 'M6 18L18 6M6 6l12 12';
        iconColor = 'text-accent-600';
        break;
      case 'info':
        iconPath = 'M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z';
        iconColor = 'text-primary-600';
        break;
      default:
        return null;
    }
    return (
      <svg
        className={`w-6 h-6 mr-3 flex-shrink-0 ${iconColor}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={iconPath}
        />
      </svg>
    );
  };

  return (
    <div
      className={`border-l-4 p-6 mb-6 rounded-xl ${getStatusClasses()} animate-slide-up`}
    >
      <div className="flex items-start">
        {getIcon()}
        <div className="flex-1">
          {header && <h3 className="font-semibold text-lg mb-2">{header}</h3>}
          <p className="font-medium leading-relaxed">{content}</p>
        </div>
      </div>
    </div>
  );
}

// Valeur par défaut de mes props
Message.defaultProps = {
  icon: null,
  header: null,
  status: null,
};

export default Message;
