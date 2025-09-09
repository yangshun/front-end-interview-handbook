import clsx from 'clsx';
import { RiLinkedinBoxFill } from 'react-icons/ri';

import authors from '~/data/authors';

import { useIntl } from '~/components/intl';
import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import type { TextSize } from '~/components/ui/Text';
import Text, { textVariants } from '~/components/ui/Text';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  author: string;
  className?: string;
  size?: TextSize;
}>;

export default function QuestionAuthor({
  author,
  className,
  size = 'body3',
}: Props) {
  const intl = useIntl();
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
    <div className={clsx('flex items-center gap-x-2', className)}>
      <Tooltip asChild={true} className="inline-flex" label={label}>
        <Anchor
          aria-label={authorData.name}
          href={authorData.links.linkedin || '#'}
          variant="unstyled">
          <Avatar
            alt={authorData.name}
            className="!size-5"
            src={authorData.imageUrl}
          />
        </Anchor>
      </Tooltip>
      <Anchor
        className={textVariants({
          className: 'block whitespace-nowrap',
          color: 'default',
          size,
        })}
        href={authorData.links.linkedin || '#'}
        variant="flat">
        {authorData.name}
      </Anchor>
      <Text
        className="block whitespace-nowrap"
        color="subtitle"
        size="body3"
        weight="medium">
        {authorData.subtitle}
      </Text>
      {authorData.links.linkedin && (
        <Anchor href={authorData.links.linkedin} variant="unstyled">
          <RiLinkedinBoxFill
            aria-hidden={true}
            className={textVariants({
              className: 'size-4 shrink-0',
              color: 'subtitle',
              size,
              weight: 'bold',
            })}
          />
        </Anchor>
      )}
    </div>
  );
}
