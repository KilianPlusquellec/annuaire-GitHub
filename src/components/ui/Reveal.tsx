import { motion, useReducedMotion } from 'motion/react';
import { ReactNode } from 'react';

type RevealProps = {
  children: ReactNode;
  /** Décalage en secondes, pour séquencer deux ou trois blocs voisins. */
  delay?: number;
  className?: string;
  as?: 'div' | 'section' | 'li' | 'article';
};

/**
 * Apparition à l'entrée dans le viewport. Sert à séquencer la lecture d'une
 * page longue : chaque section arrive quand on la regarde, jamais avant.
 * Se désactive entièrement si l'utilisateur a demandé moins de mouvement.
 */
function Reveal({
  children,
  delay = 0,
  className = '',
  as = 'div',
}: RevealProps) {
  const reduce = useReducedMotion();
  const Component = motion[as];

  return (
    <Component
      className={className}
      initial={reduce ? false : { opacity: 0, transform: 'translateY(18px)' }}
      whileInView={{ opacity: 1, transform: 'translateY(0px)' }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </Component>
  );
}

export default Reveal;
