import { useId } from 'react';
import { useIntl } from 'react-intl';

import authors from '~/data/authors';

import type { TextSize } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  author: string;
  size?: TextSize;
}>;

export default function QuestionAuthor({ author, size = 'body3' }: Props) {
  const intl = useIntl();
  const id = useId();
  const authorData = authors[author];

  if (authorData == null) {
    return null;
  }

  const label = intl.formatMessage({
    defaultMessage: 'Author',
    description: 'Author of the question',
    id: 'n0mDHU',
  });

  return (
    <div className="group block flex-shrink-0">
      <span className="sr-only" id={id}>
        {label}
      </span>
      <div aria-labelledby={id} className="flex items-center gap-x-3">
        <div>
          <Tooltip label={label} position="above">
            <img
              alt={authorData.name}
              className="inline-block size-8 rounded-full"
              src={authorData.imageUrl}
            />
          </Tooltip>
        </div>
        <div className="flex flex-col gap-y-0.5">
          <Text
            className="whitespace-nowrap text-neutral-700 dark:text-neutral-500"
            color="inherit"
            display="block"
            size={size}
            weight="bold">
            {authorData.name}
          </Text>
          <Text
            className="whitespace-nowrap text-neutral-700 dark:text-neutral-500"
            color="inherit"
            display="block"
            size="body3">
            {authorData.subtitle}
          </Text>
        </div>
      </div>
    </div>
  );
}
