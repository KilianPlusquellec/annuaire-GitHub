import { Link } from 'react-router-dom';
import logo from '../assets/images/GitHub_Logo.png';

function Accueil() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100">
      <div className="flex flex-col min-h-screen">
        <main className="flex-1 flex items-center justify-center px-6 py-12">
          <div className="text-center max-w-4xl mx-auto animate-fade-in">
            <div className="mb-8">
              <img
                src={logo}
                alt="GitHub Logo"
                className="w-24 h-24 mx-auto mb-6 filter drop-shadow-lg"
              />
            </div>

            <h1 className="text-5xl md:text-6xl font-display font-bold text-secondary-900 mb-6 leading-tight">
              Annuaire GitHub
              <span className="block text-primary-600 text-3xl md:text-4xl font-semibold mt-2">
                Professionnel
              </span>
            </h1>

            <p className="text-xl md:text-2xl text-secondary-700 font-medium mb-8 leading-relaxed max-w-3xl mx-auto">
              Découvrez et explorez les meilleurs dépôts open source de la
              communauté GitHub. Trouvez des projets innovants, des outils
              puissants et des bibliothèques essentielles pour vos
              développements.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link
                to="/annuaire-GitHub"
                className="bg-primary-600 hover:bg-primary-700 text-white font-semibold py-4 px-8 rounded-xl shadow-soft hover:shadow-large transition-all duration-300 hover:scale-105 inline-flex items-center text-lg"
              >
                <svg
                  className="w-6 h-6 mr-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                Commencer la recherche
              </Link>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-secondary-300 hover:border-primary-400 text-secondary-700 hover:text-primary-700 font-semibold py-4 px-8 rounded-xl transition-all duration-300 hover:scale-105 inline-flex items-center text-lg"
              >
                <svg
                  className="w-6 h-6 mr-3"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                Visiter GitHub
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-6 h-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-secondary-900 mb-2">
                  Rapide
                </h3>
                <p className="text-secondary-600 text-sm">
                  Recherche instantanée dans des millions de dépôts
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-6 h-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-secondary-900 mb-2">
                  Fiable
                </h3>
                <p className="text-secondary-600 text-sm">
                  Données directement issues de l&apos;API GitHub officielle
                </p>
              </div>

              <div className="bg-white/70 backdrop-blur-sm rounded-2xl p-6 shadow-soft">
                <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <svg
                    className="w-6 h-6 text-primary-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <h3 className="font-semibold text-secondary-900 mb-2">
                  Open Source
                </h3>
                <p className="text-secondary-600 text-sm">
                  Contribuez et améliorez la plateforme ensemble
                </p>
              </div>
            </div>
          </div>
        </main>

        <footer className="text-center py-6 px-6 border-t border-secondary-200 bg-white/50 backdrop-blur-sm">
          <p className="text-secondary-600 text-sm">
            GitHub est une marque déposée de GitHub, Inc. •
            <button
              type="button"
              className="text-primary-600 hover:text-primary-700 ml-1 transition-colors duration-200 underline"
            >
              Mentions légales
            </button>
          </p>
        </footer>
      </div>
    </div>
  );
}

export default Accueil;
