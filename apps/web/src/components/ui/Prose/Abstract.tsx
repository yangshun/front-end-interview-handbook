import type { ReactNode } from 'react';

type Props = Readonly<{
  children: ReactNode;
}>;

export default function Abstract({ children }: Props) {
  return (
    <div className="text-lg text-neutral-700 dark:text-neutral-400">
      {children}
    </div>
  );
}
