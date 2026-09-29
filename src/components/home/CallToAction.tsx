import { Link } from 'react-router-dom';

import { SEARCH_CTA, SEARCH_PATH } from '../../lib/links';
import { ButtonIcon } from '../ui/Button';
import buttonStyles from '../ui/buttonStyles';
import Reveal from '../ui/Reveal';

function CallToAction() {
  return (
    <Reveal as="section" className="mx-auto w-full max-w-6xl px-4 pb-8">
      <div className="relative overflow-hidden rounded-shell border border-line/[0.09] bg-shell px-6 py-20 text-center">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(70%_120%_at_50%_120%,rgb(var(--accent)/0.2),transparent_70%)]"
        />

        <div className="relative mx-auto max-w-xl">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
            Un mot-clé suffit.
          </h2>
          <p className="mx-auto mt-4 max-w-md leading-relaxed text-fg-2 text-pretty">
            L&apos;annuaire interroge l&apos;API GitHub en direct. Pas de
            compte, pas d&apos;installation.
          </p>

          <Link
            to={SEARCH_PATH}
            className={`${buttonStyles('primary', 'lg')} mt-9`}
          >
            {SEARCH_CTA}
            <ButtonIcon />
          </Link>
        </div>
      </div>
    </Reveal>
  );
}

export default CallToAction;
