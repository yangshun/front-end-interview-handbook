import type { ReactNode } from 'react';

type Props = Readonly<{
  children: ReactNode;
}>;

export default function Abstract({ children }: Props) {
  return (
    <div className="not-prose lead -mt-2 border-b border-slate-200 pb-10 sm:pb-12">
      {children}
    </div>
  );
}
