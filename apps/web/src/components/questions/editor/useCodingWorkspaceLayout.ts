import { useState } from 'react';

export type CodingWorkspaceLayout = 'horizontal' | 'vertical';

export default function useCodingWorkspaceLayout(
  initialLayout: CodingWorkspaceLayout,
) {
  return useState<CodingWorkspaceLayout>(initialLayout);
}
