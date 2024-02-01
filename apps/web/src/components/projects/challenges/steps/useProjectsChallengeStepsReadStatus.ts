import { useLocalStorage } from 'usehooks-ts';

import type { ProjectsChallengeItemStepsTabType } from './ProjectsChallengeStepsTabsImpl';
import type { ProjectsChallengeItem } from '../types';

export default function useProjectsChallengeStepsReadStatus(
  challenge: ProjectsChallengeItem,
  step: ProjectsChallengeItemStepsTabType,
) {
  return useLocalStorage(
    `gfe:projects:${challenge.metadata.slug}:steps:${step}`,
    step === 'brief', // First step is read by default.
  );
}
