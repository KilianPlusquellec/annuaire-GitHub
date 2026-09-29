import cn from '../../lib/cn';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost';
export type ButtonSize = 'md' | 'lg';

const BASE =
  'group relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium ' +
  'transition-[transform,background-color,border-color,color,box-shadow] duration-200 ease-out ' +
  'active:scale-[0.97] disabled:pointer-events-none disabled:opacity-50';

const VARIANTS: Record<ButtonVariant, string> = {
  primary: 'bg-accent text-accent-ink shadow-soft hover:brightness-110',
  secondary:
    'border border-line/[0.12] bg-card text-fg shadow-soft hover:border-line/25 hover:bg-shell',
  ghost: 'text-fg-2 hover:bg-line/[0.06] hover:text-fg',
};

const SIZES: Record<ButtonSize, string> = {
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 pl-6 pr-1.5 text-[0.95rem]',
};

/** Classes partagées par <button>, <a> et <Link>, pour un rendu identique. */
export default function buttonStyles(
  variant: ButtonVariant = 'primary',
  size: ButtonSize = 'md'
) {
  return cn(BASE, VARIANTS[variant], SIZES[size]);
}
