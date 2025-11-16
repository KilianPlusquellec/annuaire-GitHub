import { Repos } from '../../@types';

type ReposResultsProps = {
  list: Repos[];
};

function ReposResults({ list }: ReposResultsProps) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
      {list.map((item, index) => (
        <article
          key={item.id}
          className="bg-white border border-secondary-200 rounded-2xl shadow-soft hover:shadow-large p-6 hover:scale-[1.02] transition-all duration-300 animate-fade-in"
          style={{ animationDelay: `${index * 0.1}s` }}
        >
          <div className="flex items-center mb-4">
            <img
              src={item.owner.avatar_url}
              alt={`${item.owner.login} avatar`}
              className="w-12 h-12 rounded-full border-2 border-secondary-200 mr-4"
            />
            <div>
              <h3 className="font-semibold text-secondary-900 text-lg">
                {item.owner.login}
              </h3>
              <p className="text-secondary-500 text-sm">Propriétaire</p>
            </div>
          </div>

          <h2 className="text-xl font-display font-bold text-secondary-900 mb-3 leading-tight">
            <a
              href={item.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-700 hover:text-primary-800 transition-colors duration-200"
            >
              {item.name}
            </a>
          </h2>

          <p className="text-secondary-600 text-sm leading-relaxed mb-4 line-clamp-3">
            {item.description || 'Aucune description disponible'}
          </p>

          <div className="flex items-center justify-between pt-4 border-t border-secondary-100">
            <div className="flex items-center text-secondary-500 text-sm">
              <svg
                className="w-4 h-4 mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
              {item.stargazers_count?.toLocaleString() || '0'} étoiles
            </div>
            <a
              href={item.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary-600 hover:text-primary-700 font-medium text-sm transition-colors duration-200"
            >
              Voir sur GitHub →
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}

export default ReposResults;
