import { Link } from 'react-router-dom';

import { SEARCH_PATH } from '../../lib/links';
import Reveal from '../ui/Reveal';

// Logos officiels servis par Simple Icons, en monochrome pour rester lisibles
// dans les deux thèmes. Deux sources par logo : une par thème.
const LIGHT = '11161C';
const DARK = 'EDEFF2';

const LANGUAGES = [
  { name: 'TypeScript', slug: 'typescript' },
  { name: 'JavaScript', slug: 'javascript' },
  { name: 'Python', slug: 'python' },
  { name: 'Rust', slug: 'rust' },
  { name: 'Go', slug: 'go' },
  { name: 'Swift', slug: 'swift' },
  { name: 'Kotlin', slug: 'kotlin' },
  { name: 'PHP', slug: 'php' },
];

function LanguageRail() {
  return (
    <Reveal as="section" className="mx-auto w-full max-w-6xl px-4 pb-24">
      <h2 className="text-sm font-medium text-fg-2">
        Commencer par un langage
      </h2>

      <ul className="no-scrollbar fade-edges mt-4 flex snap-x snap-mandatory gap-2 overflow-x-auto pb-2">
        {LANGUAGES.map((language) => (
          <li key={language.slug} className="shrink-0 snap-start">
            <Link
              to={`${SEARCH_PATH}?q=${encodeURIComponent(`language:${language.name}`)}&sort=stars`}
              className="group flex items-center gap-2.5 rounded-full border border-line/[0.1] bg-card py-2.5 pl-3.5 pr-5 text-sm shadow-soft transition-[transform,border-color,box-shadow] duration-200 ease-out hover:-translate-y-0.5 hover:border-line/25 hover:shadow-lift active:scale-[0.97]"
            >
              <img
                src={`https://cdn.simpleicons.org/${language.slug}/${LIGHT}`}
                alt=""
                width={18}
                height={18}
                loading="lazy"
                className="h-[18px] w-[18px] dark:hidden"
              />
              <img
                src={`https://cdn.simpleicons.org/${language.slug}/${DARK}`}
                alt=""
                width={18}
                height={18}
                loading="lazy"
                className="hidden h-[18px] w-[18px] dark:block"
              />
              {language.name}
            </Link>
          </li>
        ))}
      </ul>
    </Reveal>
  );
}

export default LanguageRail;
