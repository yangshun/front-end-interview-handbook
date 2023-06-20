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
  paddingSize?: 'default' | 'wide';
  showArrow?: boolean;
}>;

export default function QuestionCard({
  metadata,
  showArrow = true,
  paddingSize = 'default',
}: Props) {
  return (
    <div
      className={clsx(
        'group relative flex items-center justify-between gap-x-4 rounded-lg py-3',
        paddingSize === 'wide' && 'px-8',
        paddingSize === 'default' && 'px-4',
        'bg-neutral-50 dark:bg-neutral-800/40',
        themeGlassyBorder,
      )}>
      <div className="flex flex-col gap-2">
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
            'h-5 w-5 shrink-0',
            themeTextFaintColor,
            'group-hover:text-brand dark:group-hover:text-brand',
          )}
        />
      )}
    </div>
  );
}
