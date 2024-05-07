'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import { useIntl } from 'react-intl';
import type * as ResembleTypes from 'resemblejs';

import resemble from '~/lib/resemble';

import ProgressBar from '~/components/ui/ProgressBar';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeBorderEmphasizeColor,
  themeGradientYellowGreen,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import type { ProjectsImageBreakpointCategory } from '../../common/ProjectsImageBreakpoints';

type ComparisonResult = ResembleTypes.ComparisonResult;

type Props = Readonly<{
  baseImage: string;
  selectedBreakpoint: ProjectsImageBreakpointCategory;
  userSubmittedImage: string;
}>;

export default function ProjectsChallengeSubmissionImageMatchScore({
  baseImage,
  userSubmittedImage,
  selectedBreakpoint,
}: Props) {
  const intl = useIntl();
  const [isCalculating, setIsCalculating] = useState(false);
  const [matchScore, setMatchScore] = useState<number | null>(null);

  useEffect(() => {
    setIsCalculating(true);

    resemble.compare(
      baseImage,
      userSubmittedImage,
      {
        scaleToSameSize: true, // This is needed so that when images are not align, it does not hurt the match score
      },
      (err: unknown, data: ComparisonResult) => {
        setIsCalculating(false);

        if (err) {
          setMatchScore(null);
          console.error(err);
        } else {
          const score = parseFloat(
            (100 - data.rawMisMatchPercentage).toFixed(1),
          );

          setMatchScore(score);
        }
      },
    );
  }, [baseImage, userSubmittedImage, selectedBreakpoint]);

  const shouldShow = matchScore != null && matchScore > 0 && !isCalculating;

  return (
    <Tooltip
      label={intl.formatMessage(
        {
          defaultMessage:
            '{matchScore}% match with the design for selected device breakpoint',
          description: 'Tooltip for match score',
          id: '/fHWzJ',
        },
        {
          matchScore,
        },
      )}
      triggerClassName={clsx(
        'flex items-center gap-2',
        'px-3 py-1.5',
        'rounded-full',
        ['border', themeBorderEmphasizeColor],
        themeBackgroundElementEmphasizedStateColor_Hover,
        themeBackgroundElementPressedStateColor_Active,
        themeOutlineElement_FocusVisible,
        themeOutlineElementBrandColor_FocusVisible,
      )}>
      <ProgressBar
        heightClass="h-1.5"
        label="Match score"
        progressClass={themeGradientYellowGreen.className}
        total={100}
        value={matchScore ?? 0}
      />
      <Text
        className={clsx(
          'w-9',
          'transition-opacity',
          !shouldShow && 'opacity-0',
        )}
        color="subtitle"
        size="body3">
        {matchScore}%
      </Text>
    </Tooltip>
  );
}
