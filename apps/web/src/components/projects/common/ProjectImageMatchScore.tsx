'use client';

import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import type * as ResembleTypes from 'resemblejs';

import resemble from '~/lib/resemble';

import Text from '~/components/ui/Text';
import Tooltip from '~/components/ui/Tooltip';

import type { ProjectsImageBreakpointCategory } from './ProjectsImageBreakpoints';

type ComparisonResult = ResembleTypes.ComparisonResult;

type Props = Readonly<{
  baseImage: string;
  selectedBreakpoint: ProjectsImageBreakpointCategory;
  userSubmittedImage: string;
}>;

export default function ProjectImageMatchScore({
  baseImage,
  userSubmittedImage,
  selectedBreakpoint,
}: Props) {
  const intl = useIntl();
  const [matchScore, setMatchScore] = useState<number | null>(null);

  const breakpoint =
    selectedBreakpoint.charAt(0).toUpperCase() + selectedBreakpoint.slice(1);

  useEffect(() => {
    resemble.compare(
      baseImage,
      userSubmittedImage,
      {
        scaleToSameSize: true, // This is needed so that when images are not align, it does not hurt the match score
      },
      (err: unknown, data: ComparisonResult) => {
        if (err) {
          setMatchScore(null);
          console.error(err);
        } else {
          const score = parseFloat(
            (100 - data.rawMisMatchPercentage).toFixed(2),
          );

          setMatchScore(score);
        }
      },
    );
  }, [baseImage, userSubmittedImage]);

  if (!matchScore) {
    return null;
  }

  return (
    <Tooltip
      label={intl.formatMessage(
        {
          defaultMessage:
            'Your solution for {breakpoint} is {matchScore}% matching with original design.',
          description: 'Tooltip for match score',
          id: 'LFMo5z',
        },
        {
          breakpoint,
          matchScore,
        },
      )}>
      <Text size="body2">{matchScore}% match</Text>
    </Tooltip>
  );
}
