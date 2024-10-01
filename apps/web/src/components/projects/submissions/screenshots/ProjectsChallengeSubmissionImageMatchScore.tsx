'use client';

import clsx from 'clsx';
import { useEffect, useState } from 'react';
import type * as ResembleTypes from 'resemblejs';

import resemble from '~/lib/resemble';

import { useIntl } from '~/components/intl';
import ProgressBar from '~/components/ui/ProgressBar';
import Text, { textVariants } from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor_Hover,
  themeBackgroundElementPressedStateColor_Active,
  themeBorderEmphasizeColor,
  themeGradientYellowGreen,
  themeOutlineElement_FocusVisible,
  themeOutlineElementBrandColor_FocusVisible,
} from '~/components/ui/theme';
import Tooltip from '~/components/ui/Tooltip';

import {
  type ProjectsImageBreakpointCategory,
  ProjectsImageBreakpointDimensions,
} from '../../common/ProjectsImageBreakpoints';

type ComparisonResult = ResembleTypes.ComparisonResult;

type Props = Readonly<{
  baseImage: string;
  breakpoint: ProjectsImageBreakpointCategory;
  userSubmittedImage: string;
}>;

export default function ProjectsChallengeSubmissionImageMatchScore({
  baseImage,
  userSubmittedImage,
  breakpoint,
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
  }, [baseImage, userSubmittedImage, breakpoint]);

  const shouldShow = matchScore != null && matchScore > 0 && !isCalculating;
  const Icon = ProjectsImageBreakpointDimensions[breakpoint].icon;

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
      <Icon
        className={textVariants({
          className: 'size-4 shrink-0',
          color: 'secondary',
        })}
      />
      <ProgressBar
        heightClass="h-1.5 sm:min-w-[100px]"
        label="Match score"
        progressClass={themeGradientYellowGreen.className}
        total={100}
        value={matchScore ?? 0}
      />
      <Text
        className={clsx(
          'inline-flex gap-2',
          'w-15',
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
