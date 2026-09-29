import {
  CheckCircle,
  Info,
  WarningCircle,
  WarningOctagon,
} from '@phosphor-icons/react';
import { ReactNode } from 'react';

import { MessageProps } from '../../@types';
import cn from '../../lib/cn';

const TONES = {
  success: { icon: CheckCircle, ring: 'bg-accent/10 text-accent-fg' },
  error: { icon: WarningOctagon, ring: 'bg-danger/10 text-danger' },
  warning: { icon: WarningCircle, ring: 'bg-danger/10 text-danger' },
  info: { icon: Info, ring: 'bg-line/[0.07] text-fg-2' },
} as const;

type Props = MessageProps & {
  /** Action proposée dans l'état vide ou l'état d'erreur. */
  children?: ReactNode;
  className?: string;
};

/**
 * Bloc d'état : sert aux trois moments où la liste n'a rien à montrer
 * (départ, aucun résultat, erreur). Composé, centré, sans carte : l'espace
 * suffit à le détacher.
 */
function Message({
  content,
  header,
  status = null,
  children = null,
  className = '',
}: Props) {
  const tone = TONES[status ?? 'info'];
  const Icon = tone.icon;

  return (
    <div
      className={cn(
        'flex flex-col items-center px-6 py-16 text-center',
        className
      )}
      role={status === 'error' ? 'alert' : 'status'}
    >
      <span
        className={cn(
          'grid h-12 w-12 place-items-center rounded-full',
          tone.ring
        )}
      >
        <Icon size={24} weight="light" aria-hidden="true" />
      </span>

      {header && (
        <h2 className="mt-5 text-lg font-semibold tracking-tight">{header}</h2>
      )}

      <p className="mt-2 max-w-sm break-words text-sm leading-relaxed text-fg-2 text-pretty">
        {content}
      </p>

      {children && <div className="mt-6">{children}</div>}
    </div>
  );
}

export default Message;
