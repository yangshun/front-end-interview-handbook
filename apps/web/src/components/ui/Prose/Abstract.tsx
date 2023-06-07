import type { ReactNode } from 'react';

type Props = Readonly<{
  children: ReactNode;
}>;

export default function Abstract({ children }: Props) {
  return <div className="lead">{children}</div>;
}
