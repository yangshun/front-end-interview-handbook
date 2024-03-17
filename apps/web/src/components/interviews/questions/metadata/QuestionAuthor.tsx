import { useId } from 'react';
import { useIntl } from 'react-intl';

import authors from '~/data/authors';

import Avatar from '~/components/ui/Avatar';
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
    <div className="group block shrink-0">
      <span className="sr-only" id={id}>
        {label}
      </span>
      <div aria-labelledby={id} className="flex items-center gap-x-3">
        <div className="inline-flex h-8">
          <Tooltip className="inline-flex" label={label}>
            <Avatar alt={authorData.name} src={authorData.imageUrl} />
          </Tooltip>
        </div>
        <div className="flex flex-col gap-y-0.5">
          <Text
            className="block whitespace-nowrap"
            color="subtitle"
            size={size}
            weight="bold">
            {authorData.name}
          </Text>
          <Text
            className="block whitespace-nowrap"
            color="secondary"
            size="body3">
            {authorData.subtitle}
          </Text>
        </div>
      </div>
    </div>
  );
}
