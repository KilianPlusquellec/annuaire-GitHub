import CallToAction from '../components/home/CallToAction';
import Capabilities from '../components/home/Capabilities';
import Hero from '../components/home/Hero';
import LanguageRail from '../components/home/LanguageRail';
import Footer from '../components/layout/Footer';
import Nav from '../components/layout/Nav';
import { useTopRepos } from '../lib/useTopRepos';

function Accueil() {
  // Une seule requête alimente l'aperçu du héros et le compteur de la grille.
  const { repos, total, state } = useTopRepos(6);

  return (
    <div className="flex min-h-[100dvh] flex-col">
      <Nav variant="landing" />

      <main className="flex-1">
        <Hero repos={repos} state={state} />
        <LanguageRail />
        <Capabilities repos={repos} total={total} state={state} />
        <CallToAction />
      </main>

      <Footer />
    </div>
  );
}

export default Accueil;
