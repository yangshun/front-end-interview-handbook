import clsx from 'clsx';
import { useEffect, useRef } from 'react';
import url from 'url';

import {
  QuestionFrameworkRawToSEOMapping,
  QuestionLanguageRawToSEOMapping,
} from '~/data/QuestionCategories';

import type { QuestionListTypeData } from '~/components/interviews/questions/common/QuestionsTypes';
import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeBackgroundElementEmphasizedStateColor,
  themeBackgroundElementEmphasizedStateColor_Hover,
} from '~/components/ui/theme';

type QuestionClickEvent = Parameters<
  NonNullable<React.ComponentProps<typeof Anchor>['onClick']>
>[0];

type Props = Readonly<{
  isActive: boolean;
  listType: QuestionListTypeData;
  onClick?: (event: QuestionClickEvent, href: string) => void;
}>;

export default function QuestionQuizScrollableListIntroduction({
  isActive,
  listType,
  onClick,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const intl = useIntl();

  const href =
    listType.type === 'framework'
      ? `/questions/quiz/${QuestionFrameworkRawToSEOMapping[listType.value]}`
      : listType.type === 'language'
        ? `/questions/quiz/${QuestionLanguageRawToSEOMapping[listType.value]}`
        : '#';

  const finalHref = url.format({
    pathname: href,
    query: {
      ...(listType.type === 'framework'
        ? { framework: listType.value }
        : listType.type === 'language'
          ? { language: listType.value }
          : {}),
      tab: 'quiz',
    },
  });

  useEffect(() => {
    if (!isActive) {
      return;
    }

    ref.current?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
    });
  }, [isActive]);

  return (
    <div
      ref={ref}
      className={clsx(
        'group relative',
        'px-6 py-4',
        'gap-4',
        'transition-colors',
        'focus-within:ring-brand focus-within:ring-2 focus-within:ring-inset',
        themeBackgroundElementEmphasizedStateColor_Hover,
        isActive && themeBackgroundElementEmphasizedStateColor,
      )}>
      <Anchor
        className="focus:outline-none"
        href={finalHref}
        variant="unstyled"
        onClick={(event) => {
          onClick?.(event, finalHref);
        }}>
        {/* Extend touch target to entire panel */}
        <span aria-hidden="true" className="absolute inset-0" />
        <Text size="body3" weight="medium">
          {intl.formatMessage({
            defaultMessage: 'Introduction',
            description:
              'Title for introduction section in quiz questions list',
            id: 'Rxyjw3',
          })}
        </Text>
      </Anchor>
    </div>
  );
}
