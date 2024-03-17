import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import Card from '~/components/ui/Card';
import Text from '~/components/ui/Text';
import { themeTextFaintColor } from '~/components/ui/theme';

import type { QuestionMetadata } from '../../common/QuestionsTypes';
import QuestionFrameworks from '../../metadata/QuestionFrameworks';
import QuestionLanguages from '../../metadata/QuestionLanguages';
import QuestionTopics from '../../metadata/QuestionTopics';

type Props = Readonly<{
  metadata: QuestionMetadata;
  paddingSize?: 'default' | 'wide';
  showArrow?: boolean;
  titleLines?: 1 | 2;
}>;

export default function QuestionCardGlow({
  metadata,
  paddingSize = 'default',
  showArrow = true,
  titleLines = 1,
}: Props) {
  return (
    <Card
      className={clsx(
        'group relative flex items-center justify-between gap-x-4 py-3',
        paddingSize === 'wide' && 'px-8',
        paddingSize === 'default' && 'px-4',
      )}
      padding={false}>
      <div className="flex flex-col gap-2">
        <div className="w-full">
          <Anchor href={metadata.href} variant="unstyled">
            <span aria-hidden={true} className="absolute inset-0" />
            <Text
              className={clsx(
                titleLines === 1 && 'line-clamp-1',
                titleLines === 2 && 'line-clamp-2',
              )}
              size={titleLines === 2 ? 'body2' : 'body1'}
              weight="medium">
              {metadata.title}
            </Text>
          </Anchor>
          <Text className="!line-clamp-2" color="secondary" size="body2">
            {metadata.excerpt}
          </Text>
        </div>
        {metadata.frameworks.length > 0 ? (
          <QuestionFrameworks frameworks={metadata.frameworks} />
        ) : metadata.languages.length > 0 ? (
          <QuestionLanguages languages={metadata.languages} />
        ) : metadata.topics.length > 0 ? (
          <QuestionTopics topics={metadata.topics} />
        ) : null}
      </div>
      {showArrow && (
        <RiArrowRightLine
          aria-hidden={true}
          className={clsx(
            'size-5 shrink-0',
            themeTextFaintColor,
            'group-hover:text-brand dark:group-hover:text-brand',
          )}
        />
      )}
    </Card>
  );
}
