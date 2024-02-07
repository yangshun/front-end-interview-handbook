import clsx from 'clsx';
import type { Post } from 'contentlayer/generated';
import { useId } from 'react';
import { FormattedMessage, useIntl } from 'react-intl';

import type { BlogMetadata } from '~/components/blog/BlogTypes';
import BlogTimestamp from '~/components/blog/metadata/BlogTimestamp';
import Text from '~/components/ui/Text';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  metadata: BlogMetadata;
}>;

export default function BlogAuthor({ metadata }: Props) {
  const intl = useIntl();
  const id = useId();
  const { author } = metadata;

  if (!author) {
    return null;
  }

  const label = intl.formatMessage({
    defaultMessage: 'Author',
    description: 'Author of the blog',
    id: 'nS1I3k',
  });

  return (
    <div className="group block flex-shrink-0">
      <span className="sr-only" id={id}>
        {label}
      </span>
      <div aria-labelledby={id} className="flex items-center gap-x-3">
        <Tooltip label={label} position="above">
          <img
            alt={author.name}
            className="!m-0 size-8 rounded-full"
            src={author.avatarUrl}
          />
        </Tooltip>
        <div className="flex flex-col gap-y-1">
          <Text
            className={clsx(
              'text-neutral-700 dark:text-neutral-100',
              'whitespace-nowrap',
            )}
            color="inherit"
            display="block"
            size="body2"
            weight="medium">
            {author.name}
          </Text>
          <div className="flex items-center gap-x-2">
            <Text
              className="whitespace-nowrap text-neutral-700 dark:text-neutral-400"
              color="inherit"
              display="block"
              size="body3">
              <FormattedMessage
                defaultMessage="{minutes} min read"
                description="Blog read duration label"
                id="7Rr7Yf"
                values={{
                  minutes: (metadata as Post).readingTime,
                }}
              />
            </Text>
            <div className="size-1 rounded-full bg-neutral-700 dark:bg-neutral-400" />
            <Text
              className="whitespace-nowrap text-neutral-700 dark:text-neutral-400"
              color="inherit"
              display="block"
              size="body3">
              <BlogTimestamp
                date={new Date((metadata as Post).createdAt).getTime()}
              />
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
}
