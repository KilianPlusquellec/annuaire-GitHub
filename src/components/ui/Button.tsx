import { ArrowUpRight } from '@phosphor-icons/react';
import { ButtonHTMLAttributes, ReactNode } from 'react';

import cn from '../../lib/cn';
import buttonStyles, { ButtonSize, ButtonVariant } from './buttonStyles';

type ButtonIconProps = {
  tone?: 'on-accent' | 'on-surface';
  children?: ReactNode;
};

/**
 * Pastille qui accueille l'icône de fin. Elle ne flotte jamais nue à côté du
 * libellé : elle a son propre cercle, aligné sur le padding interne du bouton.
 */
export function ButtonIcon({
  tone = 'on-accent',
  children = null,
}: ButtonIconProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        'ml-1 grid h-9 w-9 shrink-0 place-items-center rounded-full',
        'transition-transform duration-300 ease-out',
        'group-hover:translate-x-0.5 group-hover:-translate-y-px',
        tone === 'on-accent' ? 'bg-accent-ink/20' : 'bg-line/[0.08]'
      )}
    >
      {children ?? <ArrowUpRight size={16} weight="bold" />}
    </span>
  );
}

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

function Button({
  variant = 'primary',
  size = 'md',
  type = 'button',
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={cn(buttonStyles(variant, size), className)}
      {...props}
    />
  );
}

export default Button;
