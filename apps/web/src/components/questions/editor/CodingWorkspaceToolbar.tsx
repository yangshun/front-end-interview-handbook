import type { ReactNode } from 'react';

type Props = Readonly<{
  children: ReactNode;
}>;

export default function CodingWorkspaceToolbar({ children }: Props) {
  return (
    <div className="flex justify-end gap-2 border-b border-neutral-200 py-3 px-4 sm:px-6 lg:px-2 lg:py-2">
      {children}
    </div>
  );
}
