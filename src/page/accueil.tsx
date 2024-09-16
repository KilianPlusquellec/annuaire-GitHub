import { Link } from 'react-router-dom';
import './Accueil.scss';

function Accueil() {
    return (
        <div className="accueil-container">
            <main className="accueil-main">
                <section className="presentation">
                    <h2>Bienvenue sur notre annuaire GitHub</h2>
                    <p>Notre site vous permet de rechercher et de découvrir les dépôts GitHub les plus populaires et les plus intéressants.</p>
                    <Link to="/annuaire-GitHub" className="accueil-link">Commencez votre recherche</Link>
                </section>
            </main>
            <footer className="accueil-footer">
            GitHub est une marque déposée de GitHub, Inc.
            </footer>
        </div>
    );
}

export default Accueil;