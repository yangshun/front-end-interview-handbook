import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import { themeGlassyBorder, themeTextFaintColor } from '~/components/ui/theme';

import QuestionLanguages from '../../common/QuestionLanguages';
import type { QuestionMetadata } from '../../common/QuestionsTypes';
import QuestionUsersCompletedLabelWithFetching from '../../common/QuestionUsersCompletedLabelWithFetching';

type Props = Readonly<{
  metadata: QuestionMetadata;
  showArrow?: boolean;
}>;

export default function QuestionCard({ metadata, showArrow = true }: Props) {
  return (
    <div
      className={clsx(
        'group relative flex items-center justify-between gap-x-4 rounded-lg p-4',
        'bg-neutral-50 dark:bg-neutral-800/40',
        themeGlassyBorder,
      )}>
      <div className="grid gap-y-3">
        <div>
          <Anchor href={metadata.href} variant="unstyled">
            <span aria-hidden={true} className="absolute inset-0" />
            <Text display="block" weight="medium">
              {metadata.title}
            </Text>
          </Anchor>
          <Text
            className="line-clamp-2"
            color="secondary"
            display="block"
            size="body2">
            {metadata.excerpt}
          </Text>
        </div>
        <div className="flex gap-x-8">
          <QuestionLanguages languages={metadata.languages} />
          <QuestionUsersCompletedLabelWithFetching
            metadata={metadata}
            showIcon={true}
          />
        </div>
      </div>
      {showArrow && (
        <RiArrowRightLine
          aria-hidden={true}
          className={clsx(
            'h-6 w-6 shrink-0',
            themeTextFaintColor,
            'group-hover:text-brand dark:group-hover:text-brand',
          )}
        />
      )}
    </div>
  );
}
