type ClassValue = string | false | null | undefined;

/** Concatène des classes conditionnelles sans dépendance externe. */
export default function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(' ');
}
