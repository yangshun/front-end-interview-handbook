import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import Anchor from '~/components/ui/Anchor';
import Card from '~/components/ui/Card';
import Text from '~/components/ui/Text';
import { themeTextFaintColor } from '~/components/ui/theme';

import QuestionLanguages from '../common/QuestionLanguages';
import type { QuestionMetadata } from '../common/QuestionsTypes';
import QuestionUsersCompletedLabelWithFetching from '../common/QuestionUsersCompletedLabelWithFetching';

type Props = Readonly<{
  metadata: QuestionMetadata;
}>;

export default function QuestionCard({ metadata }: Props) {
  return (
    <Card
      className="group flex items-center justify-between gap-x-4 p-4"
      padding={false}
      pattern={false}>
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
      <RiArrowRightLine
        aria-hidden={true}
        className={clsx(
          'h-6 w-6 shrink-0',
          themeTextFaintColor,
          'group-hover:text-brand dark:group-hover:text-brand',
        )}
      />
    </Card>
  );
}
