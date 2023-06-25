import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import Text from '~/components/ui/Text';
import {
  themeCardBackgroundColor,
  themeGlassyBorder,
  themeTextFaintColor,
} from '~/components/ui/theme';

import type { QuestionMetadata } from '../../common/QuestionsTypes';
import QuestionLanguages from '../../metadata/QuestionLanguages';

type Props = Readonly<{
  metadata: QuestionMetadata;
  paddingSize?: 'default' | 'wide';
  showArrow?: boolean;
  titleLines?: 1 | 2;
}>;

export default function QuestionCard({
  metadata,
  paddingSize = 'default',
  showArrow = true,
  titleLines = 1,
}: Props) {
  return (
    <div
      className={clsx(
        'group relative flex items-center justify-between gap-x-4 overflow-hidden rounded-lg py-3',
        paddingSize === 'wide' && 'px-8',
        paddingSize === 'default' && 'px-4',
        themeCardBackgroundColor,
        themeGlassyBorder,
      )}>
      <div className="flex flex-col gap-2">
        <div className="w-full">
          <Anchor href={metadata.href} variant="unstyled">
            <span aria-hidden={true} className="absolute inset-0" />
            <Text
              className={clsx(
                titleLines === 1 && '!line-clamp-1',
                titleLines === 2 && '!line-clamp-2',
              )}
              display="block"
              size={titleLines === 2 ? 'body2' : 'body'}
              weight="medium">
              {metadata.title}
            </Text>
          </Anchor>
          <Text className="!line-clamp-2" color="secondary" size="body2">
            {metadata.excerpt}
          </Text>
        </div>
        {metadata.languages.length > 0 && (
          <div className="flex gap-x-8">
            <QuestionLanguages languages={metadata.languages} />
          </div>
        )}
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
