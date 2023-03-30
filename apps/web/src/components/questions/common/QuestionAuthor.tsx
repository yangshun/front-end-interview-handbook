import { useId } from 'react';
import { FormattedMessage } from 'react-intl';

import authors from '~/data/authors';

import type { TextVariant } from '~/components/ui/Text';
import Text from '~/components/ui/Text';
type Props = Readonly<{
  author: string;
  variant?: TextVariant;
}>;

export default function QuestionAuthor({ author, variant = 'body3' }: Props) {
  const id = useId();
  const authorData = authors[author];

  if (authorData == null) {
    return null;
  }

  return (
    <div className="group block flex-shrink-0">
      <span className="sr-only" id={id}>
        <FormattedMessage
          defaultMessage="Author"
          description="Author of the question"
          id="n0mDHU"
        />
      </span>
      <div aria-labelledby={id} className="flex items-center">
        <div>
          <img
            alt={authorData.name}
            className="inline-block h-8 w-8 rounded-full"
            src={authorData.imageUrl}
          />
        </div>
        <div className="ml-3">
          <Text color="secondary" variant={variant}>
            {authorData.name}
          </Text>
        </div>
      </div>
    </div>
  );
}
