import { GithubLogo } from '@phosphor-icons/react';

import { SOURCE_URL } from '../../lib/links';

function Footer() {
  return (
    <footer className="mt-24 border-t border-line/[0.08] px-4 pt-10 pb-[calc(2.5rem+env(safe-area-inset-bottom))]">
      <div className="mx-auto flex w-full max-w-5xl flex-col gap-4 text-sm text-fg-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="max-w-md leading-relaxed">
          GitHub est une marque déposée de GitHub, Inc. Ce site utilise
          l&apos;API publique de GitHub et n&apos;est pas affilié à GitHub.
        </p>

        <a
          href={SOURCE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 self-start rounded-full transition-colors duration-200 hover:text-fg"
        >
          <GithubLogo size={16} weight="light" />
          Code source
        </a>
      </div>
    </footer>
  );
}

export default Footer;
